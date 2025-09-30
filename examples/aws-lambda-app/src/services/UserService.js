// services/UserService.js

import { DatabaseService } from './DatabaseService.js';

/**
 * Handles user-related business logic.
 * It depends on the DatabaseService for data access.
 */
export class UserService {
  /**
   * @param {DatabaseService} databaseService
   */
  constructor(databaseService) {
    this.db = databaseService;
    console.log(`UserService: Initialized with DB status: ${this.db.getConnectionStatus()}`);
  }

  /**
   * Retrieves user data by delegating to the database service.
   * @param {string} id
   * @returns {object}
   */
  getUserData(id) {
    return this.db.fetchUser(id);
  }
}
