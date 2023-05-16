import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Wall from './pages/Wall';
import WallRoutes from './pages/WallRoutes';
import WallRoute from './pages/WallRoute';
import WallRouteAdd from './pages/WallRouteAdd';
import Layout from './layout';
import WallAdd from './pages/WallAdd';
import Login from './pages/Login';
import Register from './pages/Register.tsx';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: 'walls/add',
        element: <WallAdd />
      },
      {
        path: 'walls/:wallId',
        element: <Wall />,
      },
      {
        path: 'walls/:wallId/routes',
        element: <WallRoutes />,
      },
      {
        path: 'walls/:wallId/routes/add',
        element: <WallRouteAdd />,
      },
      {
        path: 'walls/:wallId/routes/:routeId',
        element: <WallRoute />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
