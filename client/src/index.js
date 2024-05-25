import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing pages

import Home from "./pages/home.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
