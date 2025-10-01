// src/DIContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import container from './container';
import { UserService } from './services/UserService';

// 1. Context to hold the map of resolved service instances
const ServiceContext = createContext(null);

// 2. Custom hook to access a specific resolved service
export const useService = (ServiceClass) => {
  const services = useContext(ServiceContext);
  if (!services) {
    throw new Error('useService must be used within a DIProvider');
  }
  // Look up the resolved service instance by its class/identifier
  const serviceInstance = services.get(ServiceClass);
  if (!serviceInstance) {
    throw new Error(
      `Service ${
        ServiceClass.name || String(ServiceClass)
      } was not resolved by the provider.`
    );
  }
  return serviceInstance;
};

// 3. Provider component that handles the async resolution and loading state
export const DIProvider = ({ children }) => {
  // Map to store resolved services: Map<Identifier, Instance>
  const [resolvedServices, setResolvedServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeServices = async () => {
      try {
        setLoading(true);
        // Resolve the top-level service (UserService). light-di handles its async creation.
        const userServiceInstance = await container.resolve(UserService);

        // Store all resolved services in a map for easy lookup by useService
        const resolvedMap = new Map();
        resolvedMap.set(UserService, userServiceInstance);

        setResolvedServices(resolvedMap);
        setLoading(false);
      } catch (err) {
        console.error('Dependency Injection Initialization Error:', err);
        setError('Failed to initialize required services.');
        setLoading(false);
      }
    };

    initializeServices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 rounded-xl shadow-lg bg-white border border-indigo-200">
          <div className="animate-pulse text-xl font-semibold text-indigo-600">
            Initializing Services... (Simulating 1.5s connection time)
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="p-6 rounded-xl shadow-lg bg-white border border-red-300">
          <h2 className="text-xl font-bold text-red-700">Service Error</h2>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  // Once resolved, pass the map of instances via context
  return (
    <ServiceContext.Provider value={resolvedServices}>
      {children}
    </ServiceContext.Provider>
  );
};
