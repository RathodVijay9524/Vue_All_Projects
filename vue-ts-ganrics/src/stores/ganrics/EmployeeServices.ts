import axios from 'axios'

import type { Employee } from '@/service/Employee'
import type { CRUDServices } from './CRUDServices'

class EmployeeServices implements CRUDServices<Employee> {
  baseUrl = 'http://localhost:9090/api/v1/employees' // Add this property to satisfy the interface

  async getAll(): Promise<Employee[]> {
    const response = await axios.get<Employee[]>(this.baseUrl)
    return response.data
  }

  async getById(id: number): Promise<Employee> {
    const response = await axios.get<Employee>(`${this.baseUrl}/${id}`)
    return response.data
  }

  async create(item: Employee): Promise<Employee> {
    const response = await axios.post<Employee>(this.baseUrl, item)
    return response.data
  }

  async update(item: Employee, id: number): Promise<Employee> {
    const response = await axios.put<Employee>(`${this.baseUrl}/${id}`, item)
    return response.data
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`)
  }
}

export default new EmployeeServices()

/*
import axios from 'axios'
import type { CRUDServices } from './CRUDServices'

export class GenericCRUDService<T> implements CRUDServices<T> {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getAll(): Promise<T[]> {
    const response = await axios.get<T[]>(this.baseUrl)
    return response.data
  }

  async getById(id: number): Promise<T> {
    const response = await axios.get<T>(`${this.baseUrl}/${id}`)
    return response.data
  }

  async create(item: T): Promise<T> {
    const response = await axios.post<T>(this.baseUrl, item)
    return response.data
  }

  async update(item: T, id: number): Promise<T> {
    const response = await axios.put<T>(`${this.baseUrl}/${id}`, item)
    return response.data
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`)
  }
}


*/
