// index.js
// The main AWS Lambda handler file.

// We are using a local path here for the light-di library. In a real project,
// you would use 'import { container } from "light-di";'
import { Container } from '../../src/container.js';
import { UserService, LoggerService } from './services/UserService.js';

// --- Global Scope (Runs on Cold Start) ---
// This is where we set up the dependency injection container.
// This code is executed only once when the Lambda container is spun up.
const container = new Container();

container.register(LoggerService, LoggerService, [], 'singleton');
container.register(UserService, UserService, [LoggerService], 'transient');

/**
 * Main Lambda handler function.
 * @param {Object} event The API Gateway event.
 * @returns {Promise<Object>} The HTTP response.
 */
export const handler = async (event) => {
  // --- Execution Scope (Runs on every invocation) ---
  // We resolve the services we need for this specific invocation.
  // The container is already configured from the global scope.
  const userService = container.resolve(UserService);

  try {
    // Extract the user ID from the path parameters
    const userId = event.pathParameters?.id;
    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'User ID is required' })
      };
    }

    const user = await userService.getUser(userId);

    return {
      statusCode: 200,
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};
