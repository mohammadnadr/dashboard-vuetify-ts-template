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
      name: 'aboutMe',
      path: '/aboutMe',
      component: () => import('@/views/pages/aboutMe/AboutMe.vue')
    }
  ]
};

export default MainRoutes;
