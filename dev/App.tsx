import { Component, Show, createSignal } from "solid-js";
import logo from "./logo.svg";
import styles from "./App.module.css";
import { createLanyard } from "../src";

const App: Component = () => {
  // const { loading, status } = createLanyard({
  //   userId: "724579978921902114",
  //   socket: true,
  // });

  const { latest, loading } = createLanyard({
    userId: "724579978921902114",
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        {/* <Show when={!loading()}>
          <div>status: {status?.discord_status}</div>
        </Show> */}
        <Show when={!loading}>
          <div>status: {latest?.data.discord_user.username}</div>
        </Show>
      </header>
    </div>
  );
};

export default App;
