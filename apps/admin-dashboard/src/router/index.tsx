import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

import Dashboard from '../pages/Dashboard';
// import Orders from '../pages/Orders';
// import Menu from '../pages/Menu';
// import Analytics from '../pages/Analytics';
// import Tables from '../pages/Tables';
// import Receipts from '../pages/Receipts';
// import Settings from '../pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // { path: 'orders', element: <Orders /> },
      // { path: 'menu', element: <Menu /> },
      // { path: 'analytics', element: <Analytics /> },
      // { path: 'tables', element: <Tables /> },
      // { path: 'receipts', element: <Receipts /> },
      // { path: 'settings', element: <Settings /> },
    ],
  },
]);
