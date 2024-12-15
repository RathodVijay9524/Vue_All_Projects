/*
import axios from 'axios'

export class CRUDService<T> {
  constructor(private baseUrl: string) {}

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
export interface CRUDServices<T> {
  getAll(): Promise<T[]>
  getById(id: number): Promise<T>
  create(item: T): Promise<T>
  update(item: T, id: number): Promise<T>
  delete(id: number): Promise<void>
}
