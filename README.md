<p align="center">
  <h3 align="center">Solid Create Lanyard</h3>
  <h4 align="center">Solid.js port of <a href="https://github.com/barbarbar338/react-use-lanyard">react-use-lanyard</a></h3>

<p align="center">
<br/>
    Use Lanyard API easily in your Solid app!
    <br />
    <a href="https://github.com/barbarbar338/solid-create-lanyard/issues">Report Bug</a>
    ·
    <a href="https://github.com/barbarbar338/solid-create-lanyard/issues">Request Feature</a>
    ·
    <a href="https://github.com/Phineas/lanyard">What Is Lanyard</a>
  </p>
</p>

# 📦 Installation

- Using yarn: `yarn add solid-create-lanyard`
- Using npm: `npm i solid-create-lanyard`

# 🤓 Usage

Using without websocket:

```js
import { createLanyard } from "solid-create-lanyard";

function App() {
  const { latest, loading } = createLanyard({
    userId: "952574663916154960",
  });

  return (
    <Show when={!loading}>
      <pre>{JSON.stringify(latest.data, null, 4)}</pre>
    </Show>
  );
}

export default App;
```

Using with websocket:

```js
import { createLanyard } from "solid-create-lanyard";

function App() {
  const { loading, status /*, websocket */ } = createLanyard({
    userId: "952574663916154960",
    socket: true,
  });

  return (
    <Show when={!loading()}>
      <div>status: {JSON.stringify(status)}</div>
    </Show>
  );
}

export default App;
```

# 🔐 KV Support

You can create/delete KV pairs using this package.

```js
import { del, set } from "solid-create-lanyard";

// Set KV pair
await set({
  apiKey: "your_api_key", // get it using .apikey command on lanyard bot
  userId: "your_user_id",
  key: "test_key",
  value: "test value",
  // apiUrl: "lanyard.338.rocks", // if you are using self-hosted api, not required by default
});

// Delete KV pair
await del({
  apiKey: "your_api_key",
  userId: "your_user_id",
  key: "test_key",
  // apiUrl: "lanyard.338.rocks", // if you are using self-hosted api, not required by default
});
```

# 🤞 Using Self-Hosted API

You can use this package to connect to your own self-hosted Lanyard API. To do
this, you need to pass the `apiUrl` option to the `createLanyard` hook. See
[Lanyard self-hosting guide](https://github.com/Phineas/lanyard#self-host-with-docker)
for more information.

Using without websocket:

```js
import { createLanyard } from "solid-create-lanyard";

function App() {
  const { latest, loading } = createLanyard({
    userId: "952574663916154960",
    apiUrl: "lanyard.338.rocks",
  });

  return (
    <Show when={!loading}>
      <pre>{JSON.stringify(latest.data, null, 4)}</pre>
    </Show>
  );
}

export default App;
```

Using with websocket:

```js
import { createLanyard } from "solid-create-lanyard";

function App() {
  const { loading, status /*, websocket */ } = createLanyard({
    userId: "952574663916154960",
    socket: true,
    apiUrl: "lanyard.338.rocks",
  });

  return (
    <Show when={!loading()}>
      <div>status: {JSON.stringify(status)}</div>
    </Show>
  );
}

export default App;
```

# 📄 License

Distributed under the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html)
License. See `LICENSE` for more information.

# 🧦 Contributing

Feel free to use GitHub's features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/my-feature`)
3. Run prettier and eslint (`npm run format && npm run lint`)
4. Commit your Changes (`git commit -m 'my awesome feature my-feature'`)
5. Push to the Branch (`git push origin feature/my-feature`)
6. Open a Pull Request

# 🔥 Show your support

Give a ⭐️ if this project helped you!

# ✨ Special Thanks

- [Barış DEMİRCİ](https://github.com/barbarbar338) - Creator of
  [react-use-lanyard](https://github.com/barbarbar338/react-use-lanyard)
- [Phineas](https://github.com/Phineas) - Creator of
  [Lanyard API](https://github.com/Phineas/lanyard)
- [Eggsy](https://github.com/eggsy) - Creator of
  [vue-lanyard](https://www.npmjs.com/package/@eggsydev/vue-lanyard)
