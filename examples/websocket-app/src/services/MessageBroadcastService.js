// src/services/MessageBroadcastService.js
// This service manages all WebSocket connections and broadcasts messages.
export class MessageBroadcastService {
  constructor(loggerService) {
    this.logger = loggerService;
    this.clients = new Set();
  }

  addClient(client) {
    this.clients.add(client);
    this.logger.log(`Client connected. Total clients: ${this.clients.size}`);
  }

  removeClient(client) {
    this.clients.delete(client);
    this.logger.log(`Client disconnected. Total clients: ${this.clients.size}`);
  }

  broadcastMessage(message) {
    const serializedMessage = JSON.stringify({
      type: 'message',
      content: message,
    });
    this.logger.log(
      `Broadcasting: "${message}" to ${this.clients.size} clients.`
    );

    // Iterate over all connected clients and send the message
    for (const client of this.clients) {
      if (client.readyState === client.OPEN) {
        client.send(serializedMessage);
      }
    }
  }
}

// src/services/LoggerService.js
// A simple service for centralized logging.
export class LoggerService {
  log(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`);
  }
}
