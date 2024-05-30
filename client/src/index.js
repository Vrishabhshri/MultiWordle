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
import GuesserBoard from './pages/guesser-board.jsx';
import Board2 from './pages/chooser-board.jsx';
import GuesserWaiting from './pages/guesser-waiting.jsx';
import ChooserWaiting from './pages/chooser-waiting.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/waiting-room",
    element: <WaitingRoom />,
  },
  {
    path: "/guesser-board",
    element: <GuesserBoard />,
  },
  {
    path: "/chooser-board",
    element: <Board2 />,
  },
  {
    path: "/guesser-waiting",
    element: <GuesserWaiting />,
  },
  {
    path: "/chooser-waiting",
    element: <ChooserWaiting />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
