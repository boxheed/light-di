// src/services/GreetingService.js

import { DatabaseService } from './DatabaseService.js';

/**
 * Handles the business logic for creating a greeting response.
 * It is dependent on the asynchronously initialized DatabaseService.
 */
export class GreetingService {
  /**
   * @param {DatabaseService} databaseService
   */
  constructor(databaseService) {
    this.db = databaseService;
  }

  /**
   * Generates a greeting message, including the database status.
   * @param {string} name - The name to greet.
   * @returns {object}
   */
  getGreeting(name) {
    const dbInfo = this.db.fetchMessage();
    
    return {
      greeting: `Welcome, ${name}!`,
      message: dbInfo.data,
      source: `Data fetched via DatabaseService, status: ${dbInfo.dbStatus}`,
      timestamp: new Date().toISOString(),
    };
  }
}
