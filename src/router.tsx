import { createBrowserRouter } from "react-router-dom";
import Join from "./pages/Join";
import Game from "./pages/Game";
import Seeker from "./pages/Seeker";
import Target from "./pages/Target";
import Admin from "./pages/Admin";
import App from "./App";
import Info from "./pages/Info";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Join />
        },
        {
          path: ":roomId",
          children: [
            {
              index: true,
              element: <Info />
            },
            {
              element: <Game />,
              children: [
                {
                  path: "admin",
                  element: <Admin />
                },
                {
                  path: "seeker",
                  element: <Seeker />
                },
                {
                  path: "target",
                  element: <Target />
                },
              ]
            }
          ]
        }
      ]
    },
  ]);