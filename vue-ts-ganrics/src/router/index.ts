import { createRouter, createWebHistory } from 'vue-router'

import EmployeeList from '@/components/employees/EmployeeList.vue'
import AddEmployee from '@/components/employees/AddEmployee.vue'
import EditEmployee from '@/components/employees/EditEmployee.vue'
import EmployeeLists from '@/employee/EmployeeLists.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/employees',
      name: 'employees',
      component: EmployeeList,
    },
    {
      path: '/employeelist',
      name: 'employeelist',
      component: EmployeeLists,
    },
    {
      path: '/employees/add',
      name: 'addEmployee',
      component: AddEmployee,
    },
    {
      path: '/employees/edit/:id',
      name: 'editEmployee',
      component: EditEmployee,
      props: true,
    },
  ],
})

export default router
