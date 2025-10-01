# WebSocket Server Example

This is a simple WebSocket server application that demonstrates how to use the `light-di` container to manage services in a real-time environment. The server uses the `ws` library for WebSocket functionality.

# Key Concepts

- **Singleton Services**: The `MessageBroadcastService` is registered as a singleton, ensuring that a single, shared instance manages the collection of all connected clients.
- **Service-Oriented Design**: The business logic for handling connections and broadcasting messages is encapsulated within the `MessageBroadcastService`, keeping the main server logic (`src/server.js`) clean and focused on event listeners.
- **Clean Event Handling**: The server's `on('connection')`, `on('message')`, and `on('close')` handlers are very light. They resolve the necessary services and delegate the heavy lifting to them.

# How to Run

1. Navigate to the `examples/websocket-app` directory.

```
cd examples/websocket-app
```

2. Install the dependencies.

```
npm install
```

3. Start the WebSocket server.

```
npm start
```

4. Open the `src/client.html` file in your web browser. You can open multiple browser tabs to see how the messages are broadcasted to all connected clients.
