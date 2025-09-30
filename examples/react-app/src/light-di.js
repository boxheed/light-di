// A simple, pure JavaScript dependency injection container with async/await support.

/**
 * @template T
 * @typedef {{ new (...args: any[]): T } | ((...args: any[]) => T | Promise<T>)} DependencyFactory
 */

/**
 * @template T
 * @typedef {{
 * factory: DependencyFactory<T>;
 * dependencies: any[];
 * lifecycle: 'singleton' | 'transient';
 * instance?: T;
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
      throw new Error('Identifier must be a function, string, or symbol.');
    }
    if (typeof factory !== 'function') {
      throw new Error('Factory must be a class constructor or a function.');
    }
    if (!Array.isArray(dependencies)) {
      throw new Error('Dependencies must be an array.');
    }
    if (lifecycle !== 'singleton' && lifecycle !== 'transient') {
      throw new Error('Lifecycle must be either "singleton" or "transient".');
    }

    this.#recipes.set(identifier, { factory, dependencies, lifecycle });
  }

  /**
   * Resolves and returns an instance of the service.
   * @template T
   * @param {any} identifier - The identifier of the service to resolve.
   * @returns {Promise<T>} - A promise that resolves to the resolved instance.
   */
  async resolve(identifier) {
    const recipe = this.#recipes.get(identifier);
    if (!recipe) {
      throw new Error(
        `No service registered for identifier: ${String(identifier)}`
      );
    }

    // Handle singleton lifecycle
    if (recipe.lifecycle === 'singleton' && recipe.instance) {
      return recipe.instance;
    }

    // Recursively resolve all dependencies
    const resolvedDeps = await Promise.all(
      recipe.dependencies.map((dep) => this.resolve(dep))
    );

    let instance;
    try {
      // Check if it's a class constructor (a common heuristic)
      const isClass =
        typeof recipe.factory === 'function' &&
        recipe.factory.prototype &&
        recipe.factory.prototype.constructor === recipe.factory;
      if (isClass) {
        instance = new recipe.factory(...resolvedDeps);
      } else {
        instance = await recipe.factory(...resolvedDeps);
      }
    } catch (error) {
      throw new Error(
        `Failed to instantiate service with identifier: ${String(
          identifier
        )}. Dependency resolution error: ${error.message}`
      );
    }

    // Store the instance if it's a singleton
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
