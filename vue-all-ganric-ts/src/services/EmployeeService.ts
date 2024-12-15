import { APIService } from './CRUDServices'
import type { Employee } from './Employee'

const employeeBaseUrl = 'http://localhost:9090/api/v1/employees'

export const employeeService = new APIService<Employee>(employeeBaseUrl)
