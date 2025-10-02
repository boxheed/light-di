import { describe, it, expect, beforeEach } from 'vitest';
import { Container } from './light-di.js';

describe('Container', () => {
  let container;

  beforeEach(() => {
    container = new Container();
  });

  it('should resolve a service registered with a synchronous factory', async () => {
    container.register('syncService', () => 'Hello, World!');
    const result = await container.resolve('syncService');
    expect(result).toBe('Hello, World!');
  });

  it('should resolve a service registered with an asynchronous factory', async () => {
    container.register('asyncService', async () => {
      return new Promise((resolve) =>
        setTimeout(() => resolve('Async Hello'), 10)
      );
    });
    const result = await container.resolve('asyncService');
    expect(result).toBe('Async Hello');
  });

  it('should resolve dependencies correctly', async () => {
    container.register('dependency', () => 'I am a dependency');
    container.register(
      'serviceWithDependency',
      (dep) => `Service with: ${dep}`,
      ['dependency']
    );
    const result = await container.resolve('serviceWithDependency');
    expect(result).toBe('Service with: I am a dependency');
  });

  it('should return the same instance for singleton services', async () => {
    container.register('singletonService', () => ({ id: 1 }), [], 'singleton');
    const instance1 = await container.resolve('singletonService');
    const instance2 = await container.resolve('singletonService');
    expect(instance1).toBe(instance2);
  });

  it('should return a new instance for transient services', async () => {
    container.register(
      'transientService',
      () => ({ id: Math.random() }),
      [],
      'transient'
    );
    const instance1 = await container.resolve('transientService');
    const instance2 = await container.resolve('transientService');
    expect(instance1).not.toBe(instance2);
  });

  it('should throw an error for unregistered services', async () => {
    await expect(container.resolve('unregisteredService')).rejects.toThrow(
      'Resolution failed. No service registered for identifier: unregisteredService'
    );
  });

  it('should throw an error for invalid registrations', () => {
    expect(() => container.register(123, () => {})).toThrow(
      'Invalid identifier. Service identifier must be a function, string, or symbol.'
    );
    expect(() => container.register('invalidFactory', 'notAFunction')).toThrow(
      "Invalid factory for service 'invalidFactory'. Factory must be a class constructor or a function."
    );
    expect(() =>
      container.register('invalidDependencies', () => {}, 'notAnArray')
    ).toThrow(
      "Invalid dependencies for service 'invalidDependencies'. Dependencies must be an array of identifiers."
    );
    expect(() =>
      container.register('invalidLifecycle', () => {}, [], 'invalid')
    ).toThrow(
      "Invalid lifecycle for service 'invalidLifecycle'. Lifecycle must be either \"singleton\" or \"transient\"."
    );
  });

  it('should throw an error for self-referencing dependencies', () => {
    expect(() =>
      container.register('selfDependent', () => {}, ['selfDependent'])
    ).toThrow(
      "Registration failed for service 'selfDependent'. A service cannot have a dependency on itself."
    );
  });

  it('should throw an error for circular dependencies', async () => {
    container.register('serviceA', () => {}, ['serviceB']);
    container.register('serviceB', () => {}, ['serviceA']);
    await expect(container.resolve('serviceA')).rejects.toThrow(
      'Circular dependency detected: serviceA -> serviceB -> serviceA'
    );
  });
});
