// index.js
// The main Google Cloud Function handler file.

// We are using a local path here for the light-di library. In a real project,
// you would use 'import { Container } from "light-di";'
import { Container } from '../../../src/container.js';
import { UserService, LoggerService } from './services/UserService.js';
import { http } from '@google-cloud/functions-framework';

// --- Global Scope (Runs on Cold Start) ---
// This is where we configure the dependency injection container.
// We use a factory for the LoggerService which will be provided with the
// function context at invocation time.
const container = new Container();

container.register(LoggerService, (context) => new LoggerService(context), []);
container.register(UserService, UserService, [LoggerService]);

/**
 * Main Google Cloud Function entry point.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const userFunction = async (req, res) => {
  // --- Execution Scope (Runs on every invocation) ---
  // The functions-framework uses Express.js request and response objects.
  // We can't access the function context directly here, but our LoggerService
  // doesn't actually need it for this simple example. We will create a
  // simple logger instance for this request.
  const logger = new LoggerService(null);

  // Resolve the UserService from the container.
  const userService = await container.resolve(UserService);

  try {
    const userId = req.query.id;
    if (!userId) {
      res.status(400).send('Please provide a user ID.');
      return;
    }

    const user = await userService.getUser(userId);

    res.status(200).json(user);
  } catch (error) {
    logger.log(`Error processing request: ${error}`);
    res.status(500).send('Internal server error.');
  }
};

// Register the function with the Functions Framework
http('userFunction', userFunction);
