/**
 * light-di
 *
 * A simple, lightweight, and dependency-free dependency injection (DI) container
 * for modern JavaScript and TypeScript applications. It provides a straightforward
 * API for registering and resolving services with support for singleton and
 * transient lifecycles.
 *
 * @license Apache-2.0
 */

/**
 * @template T
 * @typedef {{ new (...args: any[]): T } | ((...args: any[]) => T | Promise<T>)} DependencyFactory
 */

/**
 * @template T
 * @typedef {{
 *   factory: DependencyFactory<T>;
 *   dependencies: any[];
 *   lifecycle: 'singleton' | 'transient';
 *   instance?: T;
 * }} DependencyRecipe
 */

/**
 * The core dependency injection container.
 * It manages the registration and resolution of services.
 */
export class Container {
  /** @type {Map<any, DependencyRecipe<any>>} */
  #recipes = new Map();

  /**
   * Registers a class or factory function as a service.
   * @template T
   * @param {any} identifier - A key to identify the service (e.g., a class, string, or symbol).
   * @param {DependencyFactory<T>} factory - The class constructor or factory function to create the instance.
   * @param {any[]} [dependencies=[]] - An array of identifiers for the service's dependencies.
   * @param {'singleton' | 'transient'} [lifecycle='transient'] - The lifecycle of the service instance.
   */
  register(identifier, factory, dependencies = [], lifecycle = 'transient') {
    if (
      typeof identifier !== 'function' &&
      typeof identifier !== 'string' &&
      typeof identifier !== 'symbol'
    ) {
      throw new Error(
        'Invalid identifier. Service identifier must be a function, string, or symbol.'
      );
    }
    if (typeof factory !== 'function') {
      throw new Error(
        `Invalid factory for service '${String(
          identifier
        )}'. Factory must be a class constructor or a function.`
      );
    }
    if (!Array.isArray(dependencies)) {
      throw new Error(
        `Invalid dependencies for service '${String(
          identifier
        )}'. Dependencies must be an array of identifiers.`
      );
    }
    if (lifecycle !== 'singleton' && lifecycle !== 'transient') {
      throw new Error(
        `Invalid lifecycle for service '${String(
          identifier
        )}'. Lifecycle must be either "singleton" or "transient".`
      );
    }

    // A service cannot have a dependency on itself.
    if (dependencies.includes(identifier)) {
      throw new Error(
        `Registration failed for service '${String(
          identifier
        )}'. A service cannot have a dependency on itself.`
      );
    }

    this.#recipes.set(identifier, { factory, dependencies, lifecycle });
  }

  /**
   * Resolves and returns an instance of the service.
   * @template T
   * @param {any} identifier - The identifier of the service to resolve.
   * @returns {Promise<T>} - A promise that resolves to the instance.
   */
  async resolve(identifier) {
    return this.#resolve(identifier, []);
  }

  /**
   * Internal recursive resolution method with circular dependency detection.
   * @template T
   * @param {any} identifier
   * @param {any[]} resolutionPath
   * @returns {Promise<T>}
   */
  async #resolve(identifier, resolutionPath) {
    if (resolutionPath.includes(identifier)) {
      throw new Error(
        `Circular dependency detected: ${resolutionPath.join(
          ' -> '
        )} -> ${String(identifier)}`
      );
    }

    const recipe = this.#recipes.get(identifier);
    if (!recipe) {
      throw new Error(
        `Resolution failed. No service registered for identifier: ${String(
          identifier
        )}`
      );
    }

    if (recipe.lifecycle === 'singleton' && recipe.instance) {
      return recipe.instance;
    }

    const newResolutionPath = [...resolutionPath, identifier];

    const resolvedDeps = await Promise.all(
      recipe.dependencies.map((dep) => this.#resolve(dep, newResolutionPath))
    );

    let instance;
    try {
      const isClass =
        typeof recipe.factory === 'function' &&
        recipe.factory.prototype?.constructor === recipe.factory;
      if (isClass) {
        instance = new recipe.factory(...resolvedDeps);
      } else {
        instance = await recipe.factory(...resolvedDeps);
      }
    } catch (error) {
      if (error instanceof RangeError && error.message.includes('call stack')) {
        throw new Error(
          `Circular dependency detected while resolving service '${String(
            identifier
          )}'. Check the dependency tree.`
        );
      }
      throw new Error(
        `Failed to instantiate service '${String(
          identifier
        )}'. An error occurred during dependency resolution: ${error.message}`
      );
    }

    if (recipe.lifecycle === 'singleton') {
      recipe.instance = instance;
    }

    return instance;
  }
}

/**
 * A default, shared container instance.
 * @type {Container}
 */
export const container = new Container();
