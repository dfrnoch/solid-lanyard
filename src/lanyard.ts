import { createEffect, createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { API_URL, HEARTBEAT_INTERVAL } from "./constants";
import type {
  LanyardData,
  LanyardGeneric,
  LanyardOptions,
  LanyardResponse,
} from "./types";

/**
 * @module lanyard
 * @typedef {import("./lanyard").LanyardOptions} LanyardOptions
 * @typedef {import("./lanyard").LanyardGeneric} LanyardGeneric
 * @typedef {import("./lanyard").LanyardResponse} LanyardResponse
 * @typedef {import("./lanyard").LanyardData} LanyardData
 */

/**
 * Creates a Lanyard instance for interacting with the Lanyard API using either fetch or WebSocket.
 *
 * @function
 * @template T
 * @param {T} options - An object containing Lanyard options.
 * @returns {LanyardGeneric<T>} - A Lanyard instance with methods for fetching or WebSocket interaction.
 * @example
 * // Using WebSocket
 * const { loading, status } = createLanyard({
 *   userId: "12345678901234567890",
 *   socket: true,
 * });
 * return <Show when={!loading()}>
 *          <div>status: {status?.discord_status}</div>
 *        </Show>
 * @example
 * // Using fetch API
 * const {latest, loading} = createLanyard({ userId: "12345678901234567890" });
 * if (loading) return <div>Loading...</div>;
 * return <Show when={!loading}>
 *          <div>status: {latest?.data.discord_status}</div>
 *        </Show>
 *
 */
export const createLanyard = <T extends LanyardOptions>(
  options: T,
): LanyardGeneric<T> => {
  const apiUrl = options.apiUrl || API_URL;

  if (options.socket) {
    const [status, setStatus] = createStore<LanyardData | {}>();
    const [websocket, setWebsocket] = createSignal<WebSocket>();
    const [loading, setLoading] = createSignal(true);

    createEffect(() => {
      const supportsWebSocket =
        "WebSocket" in window || "MozWebSocket" in window;
      if (options.socket && !supportsWebSocket)
        throw new Error("Browser doesn't support WebSocket connections.");

      const subscription =
        typeof options.userId === "object"
          ? "subscribe_to_ids"
          : "subscribe_to_id";

      let heartbeat: NodeJS.Timeout;
      let socket: WebSocket;

      const connectWebsocket = () => {
        if (heartbeat) clearInterval(heartbeat);

        socket = new WebSocket(`wss://${apiUrl}/socket`);
        setWebsocket(socket);
        setLoading(true);

        socket.addEventListener("open", () => {
          socket.send(
            JSON.stringify({
              op: 2,
              d: {
                [subscription]: options.userId,
              },
            }),
          );

          heartbeat = setInterval(() => {
            socket.send(
              JSON.stringify({
                op: 3,
              }),
            );
          }, HEARTBEAT_INTERVAL);
        });

        socket.addEventListener("message", ({ data }) => {
          const { t, d } = JSON.parse(data) as {
            t: "INIT_STATE" | "PRESENCE_UPDATE";
            d: LanyardData;
          };
          if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
            setStatus(d || ({} as LanyardData));
            if (loading()) setLoading(false);
          }
        });

        socket.addEventListener("close", connectWebsocket);
      };

      connectWebsocket();

      return () => {
        clearInterval(heartbeat);
        socket.removeEventListener("close", connectWebsocket);
        socket.close();
      };
    }, []);

    return { websocket, loading, status } as LanyardGeneric<T>;
  } else {
    if (typeof options.userId === "string") {
      const [data] = createResource(
        { userId: options.userId, apiUrl },
        lanyardFetcher,
      );
      return data as LanyardGeneric<T>;
    } else {
      const [data] = createResource(
        { userId: options.userId, apiUrl },
        async (data: { userId: string[]; apiUrl: string }) => {
          const responseArray: LanyardResponse[] = [];
          for (const userId of data.userId) {
            responseArray.push(await lanyardFetcher({ userId, apiUrl }));
          }
          return responseArray;
        },
      );
      return data as LanyardGeneric<T>;
    }
  }
};

const lanyardFetcher = async (data: {
  userId: string;
  apiUrl: string;
}) => {
  const response = await fetch(
    `https://${data.apiUrl}/v1/users/${data.userId}`,
  );
  if (!response.ok) throw new Error("Failed to fetch user data.");
  return response.json() as Promise<LanyardResponse>;
};
