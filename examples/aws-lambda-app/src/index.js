// index.js

// In a real project, you would import 'light-di' from npm.
import { Container } from '../../../src/light-di.js';
import { DatabaseService } from './services/DatabaseService.js';
import { UserService } from './services/UserService.js';

// 1. Create a container instance in the global scope (Cold Start Optimization)
const container = new Container();

// 2. Register Services
// Register DatabaseService as a singleton using its async factory.
// light-di will ensure this setup runs only once during the first invocation.
container.register(DatabaseService, DatabaseService.create, [], 'singleton');

// Register UserService. It depends on the DatabaseService.
container.register(UserService, UserService, [DatabaseService], 'transient');

/**
 * AWS Lambda Handler for API Gateway events.
 * @param {object} event - The API Gateway event object.
 * @returns {Promise<object>} The HTTP response object.
 */
export async function handler(event) {
  // Log the execution start time to demonstrate cold start performance
  console.log(`[HANDLER] Invocation start at ${new Date().toISOString()}`);

  try {
    // 3. Resolve the service using 'await container.resolve()'.
    // During a COLD START, this will pause and wait for DatabaseService.create() (1s delay)
    // to complete. On a WARM START, it resolves instantly.
    const userService = await container.resolve(UserService);

    // Parse the user ID from the path parameters
    const userId = event.pathParameters?.id || 'default';

    // Execute business logic
    const userData = userService.getUserData(userId);

    // Return successful response
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'User data fetched via injected service.',
        data: userData,
      }),
    };
  } catch (error) {
    console.error('[HANDLER ERROR]', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: error.message,
      }),
    };
  }
}
