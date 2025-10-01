// src/ConsoleLogger.ts
import { Logger } from './Logger.js';

/**
 * Concrete implementation of the Logger interface using the console.
 */
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }
}
