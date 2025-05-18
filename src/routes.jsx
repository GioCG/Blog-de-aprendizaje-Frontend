import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import { BlogCategoriaPage } from './pages/blog/blogInfo'; 

const routes = [
  { path: '/blog/:category', element: <BlogCategoriaPage /> },
  { path: '/auth', element: <Auth /> },
  { path: '/*', element: <DashboardPage /> }
];

export default routes;
