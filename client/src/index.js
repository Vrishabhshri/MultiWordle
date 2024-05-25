import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing router

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

// Importing pages

import Home from "./pages/home.jsx";
import WaitingRoom from './pages/waiting-room.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/waiting-room",
    element: <WaitingRoom />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
