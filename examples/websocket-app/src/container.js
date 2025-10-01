// src/container.js
// Central configuration for the light-di container.

// We are using a local path here for the light-di library. In a real project,
// you would install it via npm and import it as 'import { Container } from "light-di";'
import { Container } from '../../../src/container.js';
import {
  LoggerService,
  MessageBroadcastService,
} from './services/MessageBroadcastService.js';

// Create a singleton instance of the container
const container = new Container();

// Register the LoggerService as a singleton.
container.register(LoggerService, LoggerService, [], 'singleton');

// Register the MessageBroadcastService as a singleton, as we only need one
// instance to manage all connections.
container.register(
  MessageBroadcastService,
  MessageBroadcastService,
  [LoggerService],
  'singleton'
);

export default container;
