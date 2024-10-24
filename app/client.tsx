import "./styles.css";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Join from "./components/Join";
import Game from "./components/Game";
import Seeker from "./components/Seeker";
import Target from "./components/Target";
import Admin from "./components/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/room",
        element: <Join />
      },
      {
        path: "/room/:roomId",
        element: <Game />,
        children: [
          {
            path: "/admin",
            element: <Admin />
          },
          {
            path: "/seeker",
            element: <Seeker />
          },
          {
            path: "/target",
            element: <Target />
          },
        ]
      }
    ]
  },
]);

function App() {
  return (
    <main>
      <Outlet></Outlet>
    </main>
  );
}

createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
