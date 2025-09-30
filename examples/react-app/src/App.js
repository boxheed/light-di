// src/App.js
import React from 'react';
import { UserService } from './services/UserService';
import { useService } from './DIContext';

const UserList = () => {
  // Use the custom hook to get the already-resolved service instance
  const userService = useService(UserService);
  const users = userService.getUsers();

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
      <h2 className="text-3xl font-extrabold text-indigo-800 mb-6 border-b pb-2">
        User Directory (Injected Service)
      </h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-4 bg-indigo-50 rounded-lg flex justify-between items-center transition duration-300 hover:bg-indigo-100"
          >
            <div>
              <p className="text-lg font-semibold text-indigo-700">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <span className="text-xs text-indigo-400 font-medium">ID: {user.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main App component wrapper
const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <UserList />
    </div>
  );
};

export default App;
