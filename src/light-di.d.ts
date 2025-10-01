// TypeScript declaration file for container.js.
// This provides type safety and intellisense without needing
// to use decorators or experimental features.

export type Constructor<T> = new (...args: any[]) => T;
export type Factory<T> = (...args: any[]) => T;
export type DependencyIdentifier = any;

/**
 * A dependency injection container for managing services.
 */
export declare class Container {
  /**
   * Registers a class constructor as a service.
   * @param identifier - A key to identify the service.
   * @param factory - The class constructor to create the instance.
   * @param dependencies - An array of identifiers for the service's dependencies.
   * @param lifecycle - The lifecycle of the service ('singleton' or 'transient').
   */
  register<T>(
    identifier: DependencyIdentifier,
    factory: Constructor<T>,
    dependencies?: DependencyIdentifier[],
    lifecycle?: 'singleton' | 'transient'
  ): void;

  /**
   * Registers a factory function as a service.
   * @param identifier - A key to identify the service.
   * @param factory - The factory function to create the instance.
   * @param dependencies - An array of identifiers for the service's dependencies.
   * @param lifecycle - The lifecycle of the service ('singleton' or 'transient').
   */
  register<T>(
    identifier: DependencyIdentifier,
    factory: Factory<T>,
    dependencies?: DependencyIdentifier[],
    lifecycle?: 'singleton' | 'transient'
  ): void;

  /**
   * Resolves and returns an instance of the service.
   * @param identifier - The identifier of the service to resolve.
   * @returns The resolved instance.
   */
  resolve<T>(identifier: DependencyIdentifier): T;
}

/**
 * A default, shared container instance.
 */
export declare const container: Container;
