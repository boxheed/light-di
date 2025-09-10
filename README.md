# light-di: A Lightweight Dependency Injection Container for JavaScript

`light-di` is a simple yet powerful dependency injection (DI) container designed for modern JavaScript and TypeScript applications. It helps you manage and resolve dependencies in a clean, decoupled, and testable way.

## Key Features

- **Zero Dependencies**: The library itself has no external dependencies.
- **Simple API**: A straightforward `register` and `resolve` API that is easy to learn and use.
- **Lifecycle Management**: Supports `singleton` and `transient` lifecycles for your services.
- **Plain JavaScript**: Works with standard JavaScript classes, no decorators or complex syntax required.

## Installation

```JavaScript
npm install light-di
```

## Quick Start

```JavaScript
// A service with a dependency
class DatabaseService { /* ... */ }
class UserService {
  constructor(databaseService) {
    this.databaseService = databaseService;
  }
}

// Create and configure the container
import { Container } from 'light-di';
const container = new Container();

container.register('DatabaseService', DatabaseService, [], 'singleton');
container.register('UserService', UserService, ['DatabaseService']);

// Resolve the service
const userService = container.resolve('UserService');
```

## Examples

To see `light-di` in action across various environments and frameworks, check out the dedicated examples directory. Each example is a complete, runnable project with its own detailed `README.md` file.

- Explore the Examples »

## Contributing

We welcome contributions! Please feel free to open issues or submit pull requests.

##License

This project is licensed under the Apache 2 License.
