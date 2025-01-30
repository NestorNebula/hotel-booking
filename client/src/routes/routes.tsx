import type { RouteObject } from 'react-router';
import App from '../App';
import Auth from '@pages/auth/Auth';
import Home from '@pages/app/home/Home';
import Room from '@pages/app/room/Room';
import Reservation from '@pages/app/reservation/Reservation';
import Stay from '@pages/app/stay/Stay';
import Account from '@pages/app/account/Account';
import Admin from '@pages/app/admin/Admin';
import ErrorElement from '@pages/app/error-element/ErrorElement';
import {
  accountLoader,
  adminLoader,
  appLoader,
  authLoader,
  reserveLoader,
  stayLoader,
} from '@loaders';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'rooms/:roomId',
        element: <Room />,
      },
      {
        path: 'reserve/:roomId',
        element: <Reservation />,
        loader: reserveLoader,
      },
      {
        path: 'stay/:stayId',
        element: <Stay />,
        loader: stayLoader,
      },
      {
        path: 'account/:userId',
        element: <Account />,
        loader: accountLoader,
      },
      {
        path: 'admin',
        element: <Admin />,
        loader: adminLoader,
      },
    ],
  },
  {
    path: 'auth',
    element: <Auth />,
    loader: authLoader,
    errorElement: <ErrorElement />,
  },
];

export default routes;
