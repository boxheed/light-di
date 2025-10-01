// src/services/DatabaseService.js

/**
 * A mock Database service registered as a singleton with an async factory.
 * This simulates the time required to establish a network connection (e.g., to D1 or an external database).
 */
export class DatabaseService {
    #connectionStatus = 'Disconnected';
  
    /**
     * Static factory method to handle asynchronous initialization.
     * light-di will call this method and await the result before resolving the instance.
     * This logic runs only once during the worker's cold start.
     * @returns {Promise<DatabaseService>}
     */
    static async create() {
      console.log('[COLD START] DatabaseService: Starting async connection...');
      // Simulate a network connection delay (important for measuring cold start)
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('[COLD START] DatabaseService: Connection established successfully.');
  
      const instance = new DatabaseService();
      instance.#connectionStatus = 'Connected';
      return instance;
    }
  
    getConnectionStatus() {
      return this.#connectionStatus;
    }
  
    // Mock data fetching method
    fetchMessage() {
      return {
        dbStatus: this.#connectionStatus,
        data: 'Hello from Cloudflare!',
      };
    }
  }
  