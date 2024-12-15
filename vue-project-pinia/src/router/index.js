import Home from '@/components/Home.vue'
import Product from '@/components/Product/Product.vue'
import User from '@/components/User/User.vue'
import AddUser from '@/components/User/AddUser.vue'
import EditUser from '@/components/User/EditUser.vue'
import AddProduct from '@/components/Product/AddProduct.vue'
import EditProduct from '@/components/Product/EditProduct.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ReactiveUser from '@/components/ReactiveUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/user/add',
      name: 'user/add',
      component: AddUser,
    },
    {
      path: '/user/edit/:id',
      name: 'user/edit/:id',
      component: EditUser,
      props: true, // Pass route params as props
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
    },
    {
      path: '/product/add',
      name: 'addProduct',
      component: AddProduct,
    },
    {
      path: '/product/edit/:id',
      name: 'editProduct',
      component: EditProduct,
      props: true, // Pass route params as props
    },
    {
      path: '/reactive',
      name: 'reactive',
      component: ReactiveUser,
      
    },
  ],
})

export default router
