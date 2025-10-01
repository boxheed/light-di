# Cloudflare Worker Example

This example demonstrates how to integrate the `light-di` container into a Cloudflare Worker, focusing on asynchronous dependency management and cold start optimization for edge computing.

## Key Concepts

- **Async Initialization & Cold Start Optimization**: The example includes a `DatabaseService` with an asynchronous factory method that simulates a 1-second connection delay. During a cold start (the first invocation), `await container.resolve()` will pause until this service is ready. For all subsequent warm starts, the service is instantly available, eliminating the delay.Edge Architecture: The container is initialized in the global scope (src/container.js), ensuring services are cached and reused across multiple requests, which is critical for maximizing performance on the edge.
- **Clean Handler**: The fetch handler is a minimal wrapper. Its sole purpose is to resolve the necessary service and return the response, keeping the core business logic separate and testable.

## How to Run Locally

1. **Prerequisites**: Ensure you have Node.js and the Cloudflare Wrangler CLI installed.
2. **Navigate to the Example**:

```
cd examples/cloudflare-workers-app
```

3. **Install Dependencies**:

```
# You will need to copy `light-di` from the parent directory or install it via npm.
npm install
```

4. **Start the Worker Locally (using Wrangler)**:

```
npm start
# or
wrangler dev
# Wrangler will display the local URL, typically [http://127.0.0.1:8787/](http://127.0.0.1:8787/)
```

5. **Test the Endpoint**:

- First Request (Cold Start): Access the URL. Note the 1-second delay in your console output as the DatabaseService is initialized.
- Subsequent Requests (Warm Start): Access the URL again immediately. The response will be instant, as the services are already initialized and cached.

```
# Test by using 'name=Alice' as a query parameter
curl [http://127.0.0.1:8787/?name=Alice](http://127.0.0.1:8787/?name=Alice)
```

You will receive a JSON response confirming the greeting and the `dbStatus: Connected` status.
