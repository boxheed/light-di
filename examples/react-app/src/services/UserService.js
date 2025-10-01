// src/services/UserService.js

export class UserService {
  #users = [];

  // Static async factory method to simulate initialization (e.g., connecting to a DB)
  static async create() {
    console.log('UserService: Starting async initialization...');
    // Simulate API call or database connection setup time
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('UserService: Initialization complete.');

    const instance = new UserService();
    instance.#users = [
      { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
      { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
    ];
    return instance;
  }

  getUsers() {
    return this.#users;
  }
}
