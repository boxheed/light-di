// src/container.js
// Central configuration for the light-di container.

// In a real project, you would import 'light-di' from npm.
import { Container } from './light-di.js';
import { UserService } from './services/UserService';

const container = new Container();

// Register UserService using its static async factory method (UserService.create).
// light-di will automatically await the Promise returned by UserService.create().
container.register(UserService, UserService.create, [], 'singleton');

export default container;
