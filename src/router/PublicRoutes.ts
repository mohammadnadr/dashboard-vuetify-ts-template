const PublicRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'landing',
      path: '/',
      component: () => import('@/views/authentication/LoginPage.vue')
    },
    {
      name: 'Authentication',
      path: '/login',
      component: () => import('@/views/authentication/LoginPage.vue')
    },
    {
      name: 'Login',
      path: '/login1',
      component: () => import('@/views/authentication/auth/LoginPage.vue')
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/authentication/auth/RegisterPage.vue')
    },
    {
      name: 'Forgot Password',
      path: '/forgot-pwd',
      component: () => import('@/views/authentication/auth/ForgotPwd.vue')
    },
    {
      name: 'Check Mail',
      path: '/check-mail',
      component: () => import('@/views/authentication/auth/CheckMail.vue')
    },
    {
      name: 'Reset Password',
      path: '/reset-pwd',
      component: () => import('@/views/authentication/auth/ResetPwd.vue')
    },
    {
      name: 'Code Verification',
      path: '/code-verify',
      component: () => import('@/views/authentication/auth/CodeVerification.vue')
    },
    {
      name: 'Coming Soon ',
      path: '/comingsoon',
      component: () => import('@/views/pages/maintenance/comingsoon/Comingsoon.vue')
    },
    {
      name: 'Under Construction',
      path: '/construction',
      component: () => import('@/views/pages/underconstruction/UnderConstruction.vue')
    },
    {
      name: 'Error 404',
      path: '/error',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    {
      name: 'Error 500',
      path: '/error500',
      component: () => import('@/views/pages/maintenance/error/Error500Page.vue')
    }
  ]
};

export default PublicRoutes;
