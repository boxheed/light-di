// src/index.js

import container from './container';
import { GreetingService } from './services/GreetingService';

/**
 * Cloudflare Worker fetch handler. This handler is executed on every request.
 * @param {Request} request - The incoming HTTP request.
 * @param {object} env - The environment variables for the Worker.
 * @param {object} ctx - The execution context.
 * @returns {Promise<Response>}
 */
export default {
  async fetch(request, env, ctx) {
    console.log(`[HANDLER] Invocation start at ${new Date().toISOString()}`);

    try {
      // 1. Resolve the service using 'await container.resolve()'.
      // During a COLD START (first request), this will pause and wait for the
      // DatabaseService.create() promise (1s delay) to complete.
      // On WARM STARTS, the singleton instance is returned instantly.
      const greetingService = await container.resolve(GreetingService);

      // 2. Parse request data
      const url = new URL(request.url);
      const name = url.searchParams.get('name') || 'Friend';

      // 3. Execute business logic
      const result = greetingService.getGreeting(name);

      // 4. Return response
      return new Response(JSON.stringify(result, null, 2), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('[HANDLER ERROR]', error);
      return new Response(
        JSON.stringify({
          error: 'Internal Server Error',
          details: error.message,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  },
};
