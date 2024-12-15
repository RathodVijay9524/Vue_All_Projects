import type { Employee } from '@/service/Employee'
import EmployeeService from '@/service/EmployeeService'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [] as Employee[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    // Fetch all employees
    async fetchEmployees() {
      this.loading = true
      this.error = null
      try {
        const response = await EmployeeService.getEmployees()
        console.log('Employees fetched:', response.data) // Log the response data
        this.employees = response.data
      } catch (error) {
        this.error = 'Failed to fetch employees.'
        console.error('Error fetching employees:', error) // Log error
      } finally {
        this.loading = false
      }
    },

    // Add a new employee
    async addEmployee(employee: Employee) {
      try {
        const response = await EmployeeService.saveEmployee(employee)
        this.employees.push(response.data) // Add the new employee to the list
      } catch (error) {
        this.error = 'Failed to add employee.'
        console.error(error)
      }
    },

    // Fetch an employee by ID
    async fetchEmployeeById(id: number) {
      try {
        const response = await EmployeeService.getEmployeeById(id)
        return response.data
      } catch (error) {
        this.error = `Failed to fetch employee with ID: ${id}`
        console.error(error)
        throw error // Rethrow to handle in the component if necessary
      }
    },

    // Update an existing employee
    async updateEmployee(employee: Employee, id: number) {
      try {
        const response = await EmployeeService.updateEmployee(employee, id)
        // Update the employee in the list
        const index = this.employees.findIndex((emp) => emp.id === id)
        if (index !== -1) {
          this.employees[index] = response.data
        }
      } catch (error) {
        this.error = 'Failed to update employee.'
        console.error(error)
      }
    },

    // Delete an employee
    async deleteEmployee(id: number) {
      try {
        await EmployeeService.deleteEmployee(id)
        // Remove the employee from the list
        this.employees = this.employees.filter((employee) => employee.id !== id)
      } catch (error) {
        this.error = 'Failed to delete employee.'
        console.error(error)
      }
    },
  },
})
