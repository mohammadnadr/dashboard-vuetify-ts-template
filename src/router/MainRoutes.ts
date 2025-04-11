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
    },
    {
      name: 'ecom Products',
      path: '/ecommerce/products',
      component: () => import('@/views/pages/eCommerce/ProductPage.vue')
    },
    {
      name: 'Add Products',
      path: '/ecommerce/add-product',
      component: () => import('@/views/pages/eCommerce/AddProduct.vue')
    },
    {
      name: 'Product detail',
      path: '/ecommerce/product/detail/:id',
      component: () => import('@/views/pages/eCommerce/ProductDetails.vue')
    },
    {
      name: 'Product Checkout',
      path: '/ecommerce/checkout',
      component: () => import('@/views/pages/eCommerce/ProductCheckout.vue')
    },
    {
      name: 'Product Listing',
      path: '/ecommerce/productlist',
      component: () => import('@/views/pages/eCommerce/ProductList.vue')
    }
  ]
};

export default MainRoutes;
