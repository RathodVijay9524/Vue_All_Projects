import { createRouter, createWebHistory } from 'vue-router'
import UserManagement from '../components/users/UserManagement.vue'
import AddUser from '../components/users/AddUser.vue'
import EditUser from '../components/users/EditUser.vue'
import Employees from '../components/Employees.vue'
import EmployeeVue from '../components/employees/EmployeeVue.vue'
import AddEmployees from '../components/employees/AddEmployees.vue'
import EditEmployees from '../components/employees/EditEmployees.vue'

const routes = [
  {
    path: '/user',
    name: 'user',
    component: UserManagement,
  },
  {
    path: '/employee',
    name: 'employee',
    component: Employees,
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeeVue,
  },
  {
    path: '/employees/add',
    name: 'addEmployee',
    component: AddEmployees,
  },
  {
    path: '/employees/edit/:id',
    name: 'editEmployee',
    component: EditEmployees,
    props: true,
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL), // Now properly typed
  routes,
})

export default router
