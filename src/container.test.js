// A comprehensive it suite for the light-di container using Jest.
import { describe, it, expect, beforeEach } from 'vitest';
import { Container } from './container.js';

describe('Container', () => {
  let container;

  // Use beforeEach to create a fresh container for each it,
  // ensuring its are isolated and don't affect each other.
  beforeEach(() => {
    container = new Container();
  });

  it('should register and resolve a service correctly', () => {
    class MyService {}
    container.register(MyService, MyService);
    const service = container.resolve(MyService);
    expect(service).toBeInstanceOf(MyService);
  });

  it('should correctly inject a single dependency', () => {
    class Dependency {}
    class Service {
      constructor(dep) {
        this.dep = dep;
      }
    }
    container.register(Dependency, Dependency);
    container.register(Service, Service, [Dependency]);
    const service = container.resolve(Service);
    expect(service.dep).toBeInstanceOf(Dependency);
  });

  it('should correctly inject multiple dependencies', () => {
    class Dependency1 {}
    class Dependency2 {}
    class Service {
      constructor(dep1, dep2) {
        this.dep1 = dep1;
        this.dep2 = dep2;
      }
    }
    container.register(Dependency1, Dependency1);
    container.register(Dependency2, Dependency2);
    container.register(Service, Service, [Dependency1, Dependency2]);
    const service = container.resolve(Service);
    expect(service.dep1).toBeInstanceOf(Dependency1);
    expect(service.dep2).toBeInstanceOf(Dependency2);
  });

  it('should return the same instance for a singleton service', () => {
    class SingletonService {}
    container.register(SingletonService, SingletonService, [], 'singleton');
    const instance1 = container.resolve(SingletonService);
    const instance2 = container.resolve(SingletonService);
    expect(instance1).toBe(instance2);
  });

  it('should return different instances for a transient service', () => {
    class TransientService {}
    container.register(TransientService, TransientService, [], 'transient');
    const instance1 = container.resolve(TransientService);
    const instance2 = container.resolve(TransientService);
    expect(instance1).not.toBe(instance2);
  });

  it('should handle nested dependencies correctly', () => {
    class ServiceA {}
    class ServiceB {
      constructor(a) {
        this.a = a;
      }
    }
    class ServiceC {
      constructor(b) {
        this.b = b;
      }
    }

    container.register(ServiceA, ServiceA);
    container.register(ServiceB, ServiceB, [ServiceA]);
    container.register(ServiceC, ServiceC, [ServiceB]);

    const serviceC = container.resolve(ServiceC);
    expect(serviceC.b).toBeInstanceOf(ServiceB);
    expect(serviceC.b.a).toBeInstanceOf(ServiceA);
  });

  it('should throw an error for an unregistered dependency', () => {
    class NonExistentDependency {}
    class Service {
      constructor(dep) {}
    }
    container.register(Service, Service, [NonExistentDependency]);

    // Use toThrow to check that the resolve call throws an error.
    expect(() => container.resolve(Service)).toThrow(
      'No service registered for identifier: class NonExistentDependency'
    );
  });

  it('should use a factory function to create an instance', () => {
    const factory = (dep) => ({ value: 'it' + dep.value });
    class MyDep {
      value = 'dep';
    }

    container.register(MyDep, MyDep);
    container.register('MyService', factory, [MyDep]);

    const service = container.resolve('MyService');
    expect(service.value).toBe('itdep');
  });
});
