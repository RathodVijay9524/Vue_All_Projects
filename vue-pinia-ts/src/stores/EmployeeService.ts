import axios, { AxiosResponse } from 'axios'
import { Employee } from './Employee'

const EMPLOYEE_API_BASE_URL = 'http://localhost:3000/employees'

class EmployeeService {
  saveEmployee(employee: Employee): Promise<AxiosResponse<Employee>> {
    return axios.post<Employee>(EMPLOYEE_API_BASE_URL, employee)
  }

  getEmployees(): Promise<AxiosResponse<Employee[]>> {
    return axios.get<Employee[]>(EMPLOYEE_API_BASE_URL)
  }

  deleteEmployee(id: number): Promise<void> {
    return axios.delete(`${EMPLOYEE_API_BASE_URL}/${id}`)
  }

  getEmployeeById(id: number): Promise<AxiosResponse<Employee>> {
    return axios.get<Employee>(`${EMPLOYEE_API_BASE_URL}/${id}`)
  }

  updateEmployee(employee: Employee, id: number): Promise<AxiosResponse<Employee>> {
    return axios.put<Employee>(`${EMPLOYEE_API_BASE_URL}/${id}`, employee)
  }
}

export default new EmployeeService()
