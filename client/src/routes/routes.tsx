import type { RouteObject } from 'react-router';
import App from '../App';
import Auth from '@pages/auth/Auth';
import Home from '@pages/app/home/Home';
import Room from '@pages/app/room/Room';
import Reservation from '@pages/app/reservation/Reservation';
import Stay from '@pages/app/stay/Stay';
import { appLoader, authLoader, reserveLoader, stayLoader } from '@loaders';

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
    ],
  },
  {
    path: 'auth',
    element: <Auth />,
    loader: authLoader,
  },
];

export default routes;
