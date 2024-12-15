// src/stores/employeeStore.ts
import { defineStore } from 'pinia'
import EmployeeService from './EmployeeService'
import { Employee } from './Employee'

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
        this.employees = response.data
      } catch (error) {
        this.error = 'Failed to fetch employees.'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    // Add a new employee
    async addEmployee(employee: Employee) {
      try {
        const response = await EmployeeService.saveEmployee(employee)
        this.employees.push(response.data)
      } catch (error) {
        this.error = 'Failed to add employee.'
        console.error(error)
      }
    },

    // Get an employee by ID
    async fetchEmployeeById(id: number) {
      if (!id || isNaN(id)) {
        throw new Error('Invalid ID') // Add an extra safety check
      }
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
        this.employees = this.employees.filter((employee) => employee.id !== id)
      } catch (error) {
        this.error = 'Failed to delete employee.'
        console.error(error)
      }
    },
  },
})
