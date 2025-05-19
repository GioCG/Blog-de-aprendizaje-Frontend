import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import {UserPage} from './pages/user'
import { BlogCategoriaPage } from './pages/blog/blogInfo'; 

const routes = [
  { path: '/blog/:category', element: <BlogCategoriaPage /> },
  { path: '/auth', element: <Auth /> },
  { path: '/user', element: <UserPage /> },
  { path: '/*', element: <DashboardPage /> }
];

export default routes;
