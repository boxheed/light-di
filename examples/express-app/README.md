# Express.js Application Example

This is a simple Express.js application that demonstrates how to use the `light-di` container to manage services and their dependencies.

## Key Concepts

- **Service-Oriented**: The business logic is encapsulated in services (`UserService`, `DatabaseService`).
- **Dependency Injection**: The UserService receives its `DatabaseService` dependency through its constructor, which is managed by the `light-di` container.
- **Centralized Configuration**: The dependency graph is defined in `container.config.js`, keeping the main application logic (`app.js`) clean.
- **Singleton vs. Transient**: The `DatabaseService` is registered as a singleton to ensure a single connection, while `UserService` is transient.

## How to Run

1. Navigate to the `examples/express-app` directory.

```
cd examples/express-app
```

2. Install the Express dependency.

```
npm install
```

3. Start the application.

```
npm start
```

4. Open your web browser or use a tool like `curl` to access the route.

```
# In your browser, go to: http://localhost:3000/users/123
# Or from the command line:
curl http://localhost:3000/users/123
```

You will see the Express server output in your console and the JSON response for the user in your browser or terminal.
