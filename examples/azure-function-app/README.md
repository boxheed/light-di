# Azure Functions Application Example

This example demonstrates how to integrate the `light-di` container into an Azure Functions HTTP trigger, focusing on asynchronous dependency management and cold start optimization.The architecture ensures that complex service initialization (like a database connection) only happens once during the function's cold start.

## Key Concepts

- **Async Initialization**: The example includes a `DatabaseService` with an asynchronous factory method that simulates a 1-second connection delay. During a cold start (the first invocation), `await container.resolve()` will pause until this service is ready. For all subsequent warm starts, the service is instantly available, eliminating the delay.
- **Cold Start Optimization**: The `light-di` container is initialized in the global scope (`src/index.js`), meaning the service registration and singletons are cached across multiple function executions.
- **Service-Oriented**: The function handler is a minimal wrapper. The business logic is delegated to the `UserService`, which receives its dependencies (`DatabaseService`) via constructor injection.

## How to Run Locally

1. **Prerequisites**: Ensure you have Node.js and the Azure Functions Core Tools installed.
2. **Navigate to the Example**:

```
cd examples/azure-functions-app
```

3. **Install Dependencies**:

```
# You will need to copy `light-di` from the parent directory or install it via npm.
npm install
```

4. **Start the Azure Function Host**:

```
func start

# The console will display the local URL for the function:
# Http Functions:
#   UserFunction: http://localhost:7071/api/UserFunction
```

5. **Test the Endpoint**:

- First Request (Cold Start): Access the URL. Note the 1-second delay in your function host console output as the DatabaseService is initialized.
- Subsequent Requests (Warm Start): Access the URL again immediately. The response will be instant, as the services are already initialized and cached.

```
# Test by using 'id=123' as a query parameter
curl http://localhost:7071/api/UserFunction?id=123
```

You will receive a JSON response confirming the user data was fetched and the database status is `Connected`.
