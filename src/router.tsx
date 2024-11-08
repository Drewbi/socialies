import { createBrowserRouter } from 'react-router-dom';
import Join from './pages/Join';
import Game from './pages/Game';
import Seeker from './pages/Seeker';
import Target from './pages/Target';
import Admin from './pages/Admin';
import App from './App';
import Info from './pages/Info';
import Register from './pages/Register';
import MenuLayout from './pages/Controls';
import { ErrorBoundary } from './components/Error';

export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Join />
        },
        {
          path: ':roomId',
          children: [
            {
              path: 'admin',
              element: <Admin />
            },
            {
              element: <Game />,
              children: [
                {
                  index: true,
                  element: <Register />
                },
                {
                  path: 'info',
                  element: <Info />
                },
                {
                  element: <MenuLayout />,
                  children: [
                    {
                      path: 'seeker',
                      element: <Seeker />
                    },
                    {
                      path: 'target',
                      element: <Target />
                    },
                  ]
                }
              ]
            }
          ]
        }
      ],
      errorElement: <ErrorBoundary />
    },
  ]);