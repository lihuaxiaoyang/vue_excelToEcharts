import Home from './pages/Home';
import menus from './menu';
import Login from './pages/Login';

const childrenRoutes = [];

for (const menu of menus) {
  childrenRoutes.push(menu);
}

childrenRoutes.push({
  path: '*',
  redirect: menus[ 0 ].path,
});

const routes = [
  {
    path: '/',
    redirect: '/Login',
    // component: Home,
    // component: Login,
    // children: childrenRoutes,
  },
  { path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    children: childrenRoutes,
  },
];

export default routes;
