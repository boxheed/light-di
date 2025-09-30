// services/DatabaseService.js

/**
 * A mock Database service to simulate an asynchronous connection setup.
 * This is registered as a singleton to ensure a single connection is used.
 */
export class DatabaseService {
  #connectionStatus = 'Disconnected';

  /**
   * Static factory method to handle asynchronous initialization.
   * light-di will call this method and await the result before injecting the instance.
   * @returns {Promise<DatabaseService>}
   */
  static async create() {
    console.log('DatabaseService: Attempting to connect to database...');
    // Simulate an async network connection delay (e.g., waiting for a DB handshake)
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('DatabaseService: Connection successful.');

    const instance = new DatabaseService();
    instance.#connectionStatus = 'Connected';
    return instance;
  }

  getConnectionStatus() {
    return this.#connectionStatus;
  }

  // Mock function to fetch data
  fetch(id) {
    if (this.#connectionStatus !== 'Connected') {
      throw new Error('Database is not connected.');
    }
    console.log(`[DB] Fetching user ID: ${id}`);
    return {
      id: id,
      name: `Injected User ${id}`,
      status: 'Active',
      dbStatus: this.#connectionStatus
    };
  }
}
