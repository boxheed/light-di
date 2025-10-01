# TypeScript CLI Application Example

This example demonstrates how to use `light-di` within a Node.js Command-Line Interface (CLI) application built with TypeScript and `Commander.js`.It specifically showcases Interface-Based Dependency Injection using TypeScript Symbols to decouple services from their concrete implementations.

## Key Concepts

- **Interface Binding**: A `Logger` interface is defined, and a Logger Symbol is used as the DI identifier (`src/Logger.ts`).
- **Concrete Implementation**: The `ConsoleLogger` class implements the `Logger` interface (`src/ConsoleLogger.ts`).
- **Container Mapping**: In `src/container.ts`, the `Logger` Symbol is explicitly mapped to the `ConsoleLogger` class.
- **Decoupling**: The `GreetingService` depends on the abstract `Logger` Symbol, not the concrete `ConsoleLogger` class, making it easy to swap logging implementations.

# How to Run

1. **Prerequisites**: Ensure you have Node.js installed.
2. **Navigate to the Example**:

```
cd examples/ts-cli-app
```

3. **Install Dependencies**:

```
# Install commander, `light-di` (via file link), and TypeScript dev dependencies
npm install
```

4. **Build the Project (Compile TS to JS)**:

```
npm run build
```

5. **Run the CLI**:

- Default Run:

```
npm start
# Output: Hello, World! This message was generated using `light-di` with TypeScript.
```

- Run with Name Argument:

```
npm run greet
# Output: Hello, TypeScript User! This message was generated using `light-di` with TypeScript.
```
