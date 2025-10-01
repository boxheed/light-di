// src/container.ts
import { Container } from '../../../src/container.js';
import { GreetingService } from './GreetingService.js';
import { ConsoleLogger } from './ConsoleLogger.js';
import { Logger } from './Logger.js';

const container = new Container();

// 1. Bind the Logger Interface (Symbol) to the concrete ConsoleLogger class.
// This allows other services to depend on the abstract Logger interface.
container.register(Logger, ConsoleLogger, [], 'singleton');

// 2. Register the GreetingService.
// Its dependency is the Logger Symbol. The container will automatically
// inject the ConsoleLogger instance we mapped to that symbol.
container.register(GreetingService, GreetingService, [Logger]);

export default container;
