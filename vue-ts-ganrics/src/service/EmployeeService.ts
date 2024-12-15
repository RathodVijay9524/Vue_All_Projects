import CRUDService from './CRUDService'
import { type Employee } from './Employee'

const EMPLOYEE_API_BASE_URL = 'http://localhost:9090/api/v1/employees'

class EmployeeService {
  private crudService: CRUDService<Employee>

  constructor() {
    this.crudService = new CRUDService<Employee>(EMPLOYEE_API_BASE_URL)
  }

  // Call the generic methods for employee-specific operations
  saveEmployee(employee: Employee) {
    return this.crudService.saveEntity(employee)
  }

  getEmployees() {
    return this.crudService.getEntities()
  }

  getEmployeeById(id: number) {
    return this.crudService.getEntityById(id)
  }

  updateEmployee(employee: Employee, id: number) {
    return this.crudService.updateEntity(employee, id)
  }

  deleteEmployee(id: number) {
    return this.crudService.deleteEntity(id)
  }
}

export default new EmployeeService()
