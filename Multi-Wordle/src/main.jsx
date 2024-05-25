import React from 'react'
import ReactDOM from 'react-dom/client'

// importing pages
import Home from './pages/index.jsx'
import WaitingRoom from './pages/waiting-room.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
