# Getting Started

This guide will walk you through the basic steps to get `light-di` up and running in your project.

## Installation

To get started, install `light-di` from npm:

```bash
npm install light-di
```

## Creating the Container

The first step is to create an instance of the `Container`:

```javascript
import { Container } from 'light-di';

const container = new Container();
```

## Defining and Registering Services

Next, define the classes for your services. Here’s a simple example with a `DatabaseService` and a `UserService`:

```javascript
class DatabaseService {
  getUsers() {
    return [{ id: 1, name: 'John Doe' }];
  }
}

class UserService {
  constructor(databaseService) {
    this.databaseService = databaseService;
  }

  findUsers() {
    return this.databaseService.getUsers();
  }
}
```

Now, register these services with the container. You need to provide a unique key, the class itself, and an array of its dependencies' keys. You can also specify the lifecycle, which can be `'singleton'` (default) or `'transient'`.

```javascript
// Register DatabaseService as a singleton
container.register('DatabaseService', DatabaseService, [], 'singleton');

// Register UserService with its dependency
container.register('UserService', UserService, ['DatabaseService']);
```

## Resolving Services

Finally, resolve your top-level service from the container. The `resolve` method returns a `Promise`, so you'll need to use `async/await` or `.then()`:

```javascript
async function main() {
  const userService = await container.resolve('UserService');
  const users = await userService.findUsers();
  console.log(users); // Output: [{ id: 1, name: 'John Doe' }]
}

main();
```

And that’s it! You've successfully set up a basic dependency injection system with `light-di`.