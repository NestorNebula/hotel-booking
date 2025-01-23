import type { RouteObject } from 'react-router';
import App from '../App';
import { appLoader } from '@loaders';

const routes: RouteObject[] = [
  {
    index: true,
    element: <App />,
    loader: appLoader,
  },
];

export default routes;
