import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
//import { Blog } from './pages/blog';




const routes = [
    //{ path: '/blog', element: <Blog /> },
    { path: '/auth', element: <Auth /> },
    { path: '/*', element: <DashboardPage /> }
  ];

export default routes;