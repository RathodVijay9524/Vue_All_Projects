import { defineStore } from 'pinia'

import type { Employee } from '@/services/Employee'
import { useCRUDStore } from '@/services/CRUDStore'
import { APIService } from '@/services/CRUDServices'

const employeeService = new APIService<Employee>('http://localhost:9090/api/v1/employees')

export const useEmployeeStore = defineStore('employeeStore', () => {
  return useCRUDStore<Employee>(employeeService)
})
