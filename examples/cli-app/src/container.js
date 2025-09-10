// src/container.js
// Central configuration for the light-di container.
// This is where we define the dependency graph for our CLI tool.

// We are using a local path here for the light-di library. In a real project,
// you would install it via npm and import it as 'import { Container } from "light-di";'
import { Container } from '../../../src/container.js';
import { GreetingService, LoggerService } from './services/GreetingService.js';

// Create a singleton instance of the container
const container = new Container();

// Register the LoggerService as a singleton, as we only need one logger instance.
container.register(LoggerService, LoggerService, [], 'singleton');

// Register the GreetingService. It depends on the LoggerService.
// We let it default to a transient lifecycle.
container.register(GreetingService, GreetingService, [LoggerService]);

export default container;
