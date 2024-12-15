import AddUser from '@/components/users/AddUser.vue'
import EditUser from '@/components/users/EditUser.vue'
import UserManagement from '@/components/users/UserManagement.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: UserManagement,
    },
    {
      path: '/user/add',
      name: 'addUser',
      component: AddUser,
    },
    {
      path: '/user/edit/:id',
      name: 'editUser',
      component: EditUser,
      props: true,
    },
  ],
})

export default router
