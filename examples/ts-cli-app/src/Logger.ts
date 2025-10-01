// src/Logger.ts
/**
 * Define a TypeScript Symbol to act as the unique identifier for the Logger interface.
 * Using Symbols is the preferred way for interface binding in dependency injection.
 */
export const Logger = Symbol('Logger');

/**
 * The interface that all concrete logger implementations must adhere to.
 */
export interface Logger {
  log(message: string): void;
  error(message: string): void;
}
