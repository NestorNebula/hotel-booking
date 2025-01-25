import type { RouteObject } from 'react-router';
import App from '../App';
import Auth from '@pages/auth/Auth';
import { appLoader, authLoader } from '@loaders';

const routes: RouteObject[] = [
  {
    index: true,
    element: <App />,
    loader: appLoader,
  },
  {
    path: 'auth',
    element: <Auth />,
    loader: authLoader,
  },
];

export default routes;
