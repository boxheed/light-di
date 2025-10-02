/**
 * light-di
 *
 * A simple, lightweight, and dependency-free dependency injection (DI) container
 * for modern JavaScript and TypeScript applications. This declaration file
 * provides type definitions for TypeScript users.
 *
 * @license Apache-2.0
 */

export type Constructor<T> = new (...args: any[]) => T;
export type Factory<T> = (...args: any[]) => T | Promise<T>;
export type DependencyIdentifier = any;

/**
 * The core dependency injection container.
 * It manages the registration and resolution of services.
 */
export declare class Container {
  /**
   * Registers a class or factory function as a service.
   * @template T
   * @param identifier - A key to identify the service (e.g., a class, string, or symbol).
   * @param factory - The class constructor or factory function to create the instance.
   * @param dependencies - An array of identifiers for the service's dependencies.
   * @param lifecycle - The lifecycle of the service ('singleton' or 'transient').
   */
  register<T>(
    identifier: DependencyIdentifier,
    factory: Constructor<T> | Factory<T>,
    dependencies?: DependencyIdentifier[],
    lifecycle?: 'singleton' | 'transient'
  ): void;

  /**
   * Resolves and returns an instance of the service.
   * @template T
   * @param identifier - The identifier of the service to resolve.
   * @returns A promise that resolves to the instance.
   */
  resolve<T>(identifier: DependencyIdentifier): Promise<T>;
}

/**
 * A default, shared container instance.
 */
export declare const container: Container;
