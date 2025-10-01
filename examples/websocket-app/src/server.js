// src/server.js
// The main entry point for our WebSocket server.
import { WebSocketServer } from 'ws';
import container from './container.js';
import {
  LoggerService,
  MessageBroadcastService,
} from './services/MessageBroadcastService.js';

const port = 8080;
const wss = new WebSocketServer({ port });

// Resolve our services from the container. Since they are singletons,
// these instances will be shared across all connections.
const loggerService = await container.resolve(LoggerService);
const broadcastService = await container.resolve(MessageBroadcastService);

loggerService.log(`WebSocket server starting on port ${port}`);

wss.on('connection', (ws) => {
  // Add the new client to our centralized broadcast service
  broadcastService.addClient(ws);

  // When a message is received, delegate to the broadcast service
  ws.on('message', (message) => {
    broadcastService.broadcastMessage(message.toString());
  });

  // When the connection is closed, remove the client from the service
  ws.on('close', () => {
    broadcastService.removeClient(ws);
  });
});

wss.on('listening', () => {
  loggerService.log('Server is ready to accept connections.');
});

wss.on('error', (error) => {
  loggerService.log(`Server error: ${error.message}`);
});
