// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
// Note: ./index.css is referenced but not required for this example's styling
// import './index.css';
import App from './App';
// Updated to import DIProvider instead of DIContext
import { DIProvider } from './DIContext';
// container is no longer needed here as it's used inside DIProvider
// import container from './container';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Use the DIProvider component which handles the async resolution and loading state */}
    <DIProvider>
      <App />
    </DIProvider>
  </React.StrictMode>
);
