// src/GreetingService.ts
import { Logger } from './Logger.js';

/**
 * Handles the core business logic of generating a greeting.
 * It depends on the Logger *interface* (Logger symbol), not a concrete class.
 */
export class GreetingService {
  /**
   * @param {Logger} logger - The injected logger instance.
   */
  constructor(private logger: Logger) {
    this.logger.log('GreetingService initialized.');
  }

  generateGreeting(name: string): string {
    if (!name) {
      this.logger.error('No name provided for greeting.');
      return 'Hello, anonymous user!';
    }
    this.logger.log(`Generating personalized greeting for ${name}.`);
    return `Hello, ${name}! This message was generated using light-di with TypeScript.`;
  }
}
