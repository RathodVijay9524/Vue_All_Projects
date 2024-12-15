import { useCRUDStore } from './CRUDStore'
import { employeeService } from './EmployeeService'
import type { Employee } from './Employee'

export const useEmployeeStore = () => useCRUDStore<Employee>(employeeService)
