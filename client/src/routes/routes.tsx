import type { RouteObject } from 'react-router';
import App from '../App';
import Auth from '@pages/auth/Auth';
import Home from '@pages/app/home/Home';
import { appLoader, authLoader } from '@loaders';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: 'auth',
    element: <Auth />,
    loader: authLoader,
  },
];

export default routes;
