<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=so lanyard-solid&background=tiles&project=%20" alt="lanyard-solid">
</p><h1>lanyard-solid</h1>
A primitive that makes it easy to implement the Lanyard API into your Solid app.
<h2>Quick start</h2>
<h3>Installation</h3>
To install  `lanyard-solid`, use one of the following package managers:

``` bash
npm install lanyard-solid
# or
yarn add lanyard-solid
# or
pnpm add lanyard-solid
```
<h3>Usage</h3>
To use `lanyard-solid` in your Solid app, first import the `createLanyard` function:

``` tsx
import { createLanyard } from 'lanyard-solid';
```

<h4>Fetch API Example</h4>

```jsx
import { createLanyard } from 'lanyard-solid';

// Creating a Lanyard instance for a single user ID with fetch API
const {latest, loading} = createLanyard({ userId: "1234567890" });
return <Show when={!loading}>
         <div>status: {latest?.data.discord_status}</div>
       </Show>
```

<h4>WebSocket Example</h4>

```jsx
import { createLanyard } from 'lanyard-solid';

// Creating a Lanyard instance for a single user ID using WebSocket
const { loading, status } = createLanyard({
  userId: "724579978921902114",
  socket: true,
});
return <Show when={!loading()}>
         <div>status: {status?.discord_status}</div>
       </Show>
```

For more information about the  `createLanyard`  function and the available options, refer to the JSDoc in the source code.

