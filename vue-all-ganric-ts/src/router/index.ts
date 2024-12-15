import { createRouter, createWebHistory } from 'vue-router'
import EmployeeList from '@/components/employee/EmployeeList.vue'
import AddEmployee from '@/components/employee/AddEmployee.vue'
import EditEmployee from '@/components/employee/EditEmployee.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/employees',
      name: 'employees',
      component: EmployeeList,
    },
    {
      path: '/employees/add',
      name: 'AddEmployee',
      component: AddEmployee,
    },
    {
      path: '/employees/edit/:id',
      name: 'EditEmployee',
      component: EditEmployee,
      props: true,
    },
  ],
})

export default router
