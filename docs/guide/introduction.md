# Introduction

`light-di` is a simple, lightweight dependency injection (DI) container designed for modern JavaScript and TypeScript applications. It helps you write cleaner, more maintainable, and easily testable code by decoupling components and managing their dependencies.

## Why use a Dependency Injection Container?

In modern software development, applications are often built from many smaller, independent components. A dependency injection container helps manage the lifecycle and dependencies of these components. This leads to:

- **Decoupled Code**: Components don't create their own dependencies; they are "injected" from the outside. This makes it easier to replace dependencies, for example, with mock objects during testing.
- **Improved Testability**: Since dependencies can be easily mocked, unit testing becomes much simpler.
- **Better Code Organization**: DI containers encourage better architectural patterns and a more organized codebase.

## Core Concepts

`light-di` is built around a few core concepts:

- **Container**: The `Container` is the heart of the library. It manages the registration and resolution of services.
- **Services**: A service is typically a class that provides some functionality. Services can depend on other services.
- **Lifecycle**: `light-di` supports two lifecycles for services:
    - `singleton`: A single instance of the service is created and shared throughout the application.
    - `transient`: A new instance of the service is created every time it is resolved.