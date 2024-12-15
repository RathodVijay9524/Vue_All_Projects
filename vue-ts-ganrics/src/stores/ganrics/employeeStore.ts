// employeeStore.ts

import type { Employee } from '@/service/Employee'

import { createGenericStore } from './CRUDStore'
import EmployeeServices from './EmployeeServices'

export const useEmployeesStore = createGenericStore<Employee>('employeeStore', EmployeeServices)

/*


import { createCRUDStore } from './CRUDStore'
import { Employee } from './Employee'
import { CRUDService } from './CRUDServices'

// Create a CRUDService for Employee
const employeeService = new CRUDService<Employee>('http://localhost:3000/employees')

// Create the EmployeeStore using the generic CRUDStore
export const useEmployeeStore = createCRUDStore<Employee>('employee', employeeService)
*/
