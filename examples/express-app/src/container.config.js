// container.config.js
import { Container } from '../../../src/light-di.js';
import { DatabaseService } from './services/DatabaseService.js';
import { UserService } from './services/UserService.js';

// Create a singleton instance of the container
const container = new Container();

// Register the DatabaseService. It uses an async factory (DatabaseService.create),
// so light-di will await the connection before providing the instance.
container.register(DatabaseService, DatabaseService.create, [], 'singleton');

// Register the UserService. It depends on the fully resolved (and connected) DatabaseService.
container.register(UserService, UserService, [DatabaseService], 'transient');

export default container;
