import "./styles.css";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Join from "./pages/Join";
import Game from "./pages/Game";
import Seeker from "./pages/Seeker";
import Target from "./pages/Target";
import Admin from "./pages/Admin";

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
            path: "/room/:roomId/admin",
            element: <Admin />
          },
          {
            path: "/room/:roomId/seeker",
            element: <Seeker />
          },
          {
            path: "/room/:roomId/target",
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
