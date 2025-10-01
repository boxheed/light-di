// UserFunction/index.js

// This path assumes light-di is installed one directory up, in node_modules,
// but for this example structure, we reference the root file.
import { Container } from '../../src/container.js';
import { UserService } from '../services/UserService.js';
import { DatabaseService } from '../services/DatabaseService.js';

// 1. Create a container instance in the global scope (Cold Start Optimization)
const container = new Container();

// 2. Register Services
// Register DatabaseService as a singleton using its async factory.
// light-di will ensure this setup runs only once during the cold start.
container.register(DatabaseService, DatabaseService.create, [], 'singleton');

// Register UserService. It depends on the DatabaseService.
container.register(UserService, UserService, [DatabaseService], 'transient');

/**
 * Azure Function HTTP Trigger handler.
 * @param {Context} context - The Azure Functions context object.
 * @param {HttpRequest} req - The HTTP request object.
 * @returns {Promise<void>}
 */
export default async function (context, req) {
  context.log(`[HANDLER] Invocation start at ${new Date().toISOString()}`);

  try {
    // 3. Resolve the service using 'await container.resolve()'.
    // During a COLD START, this will pause and wait for DatabaseService.create() (1s delay)
    // to complete. On a WARM START, it resolves instantly.
    const userService = await container.resolve(UserService);

    // Parse user ID from query or body
    const userId = req.query.id || (req.body && req.body.id) || 'default';

    // Execute business logic
    const userData = userService.getUserData(userId);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: {
        message: `User data fetched via injected service.`,
        data: userData,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    context.log.error('[HANDLER ERROR]', error);
    context.res = {
      status: 500,
      body: {
        error: 'Internal Server Error',
        details: error.message,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
