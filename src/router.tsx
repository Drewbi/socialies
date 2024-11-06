import { createBrowserRouter, useRouteError } from 'react-router-dom';
import Join from './pages/Join';
import Game from './pages/Game';
import Seeker from './pages/Seeker';
import Target from './pages/Target';
import Admin from './pages/Admin';
import App from './App';
import Info from './pages/Info';
import Register from './pages/Register';
import MenuLayout from './pages/Controls';

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

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  const message = (error as Error).message

  return (
    <div className='w-full h-full p-10 flex flex-col justify-center items-center text-destructive'>
      <h1 className="text-xl">ERROR</h1>
      <code className="text-xs text-justify max-w-96">{message}</code>
      <p>Good luck</p>
    </div>
  )
}