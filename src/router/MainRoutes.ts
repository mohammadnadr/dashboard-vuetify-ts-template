const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'Starter',
      path: '/starter',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'HelloWorld',
      path: '/helloWorld',
      component: () => import('@/views/pages/helloWorld/HelloWorld.vue')
    }
  ]
};

export default MainRoutes;
