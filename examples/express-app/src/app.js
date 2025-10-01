// app.js
import express from 'express';
import container from './container.config.js';
import { UserService } from './services/UserService.js';
import { DatabaseService } from './services/DatabaseService.js';

const app = express();
const PORT = 3000;

// The application startup function is now asynchronous
async function startServer() {
  try {
    // 1. Trigger the DI container to resolve a service.
    // Resolving UserService forces the async DatabaseService to connect first,
    // ensuring the app only starts when all singletons are ready.
    console.log(
      '--- Application Initialization Start (Awaiting Database Connection) ---'
    );

    // We resolve the UserService here to ensure all dependencies are initialized
    // before the server starts. We don't need the instance yet.
    await container.resolve(UserService);

    console.log('--- Application Initialization Complete ---');

    // Define the /users/:id route
    app.get('/users/:id', async (req, res) => {
      // Resolve a new transient instance of UserService for each request
      const transientUserService = await container.resolve(UserService);
      const userId = req.params.id;

      try {
        const userData = transientUserService.getUserById(userId);
        res.json({
          message: `User data retrieved successfully for ID ${userId}`,
          data: userData,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Start the Express server
    app.listen(PORT, async () => {
      // We must await resolve here since we are outside the initial sync-init scope
      const dbService = await container.resolve(DatabaseService);
      const dbStatus = dbService.getConnectionStatus();
      console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
      console.log(`Database Status (Singleton): ${dbStatus}`);
    });
  } catch (error) {
    console.error(
      'CRITICAL ERROR: Failed to start server due to dependency injection failure.',
      error
    );
    process.exit(1);
  }
}

// Execute the async startup function
startServer();
