# wety-client
This is the frontend for [`wety.org`](https://www.wety.org/). See the [`wety`](https://github.com/jmviz/wety) repository for the data processing and server code.

## Local development
For local development, you'll need to set up both the `wety` server and the `wety-client` server.

### Server
Follow the instructions in the [`wety`](https://github.com/jmviz/wety) repo to set up and run the server.

### Client
Clone this repo:

```bash
git clone https://github.com/jmviz/wety-client.git
```

Install dependencies:

```bash
cd wety-client
npm install
```

Start the client server:

```bash
npm start
```

This will start a local server at `127.0.0.1:8000`. This will also `watch` the project, so that any changes you make to the source files will automatically trigger a production rebuild of `dist/bundle.js`. It's important to make sure that this is running while you are making changes (or that you run `npm run build` manually before you commit), otherwise your changes will not be reflected in `dist/bundle.js`.