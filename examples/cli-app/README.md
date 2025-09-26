# Command-Line Interface (CLI) Tool Example

This is a simple CLI application that demonstrates how to use the light-di container to manage services in a non-web environment. The tool uses yargs for command parsing and light-di for managing the business logic.

## Key Concepts

- **Separation of Concerns**: The CLI tool's main file (src/cli.js) is solely responsible for parsing command-line arguments. The actual logic is delegated to the GreetingService.
- **Dependency Injection**: The GreetingService is not responsible for creating its own LoggerService. Instead, the light-di container handles this, making both services more focused and easier to test in isolation.
- **Service Reusability**: The LoggerService is a simple, reusable utility that can be injected into any other service that needs to output to the console.

## How to Run

1. Navigate to the `examples/cli-app` directory.

```
cd examples/cli-app
```

2. Install the dependencies.

```
npm install
```

3. Run the CLI tool using `npx`.

```bash
npx greeter greet "CLI User"
# Expected output: Hello, CLI User!
```

You can also test the default `npm start` script.

```bash
npm start
# Expected output: Hello, World!
```
