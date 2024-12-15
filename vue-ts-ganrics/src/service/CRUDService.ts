import axios, { type AxiosResponse } from 'axios'

class CRUDService<T> {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  // Create an entity
  saveEntity(entity: T): Promise<AxiosResponse<T>> {
    return axios.post<T>(this.baseUrl, entity)
  }

  // Get all entities
  getEntities(): Promise<AxiosResponse<T[]>> {
    return axios.get<T[]>(this.baseUrl)
  }

  // Get an entity by ID
  getEntityById(id: number): Promise<AxiosResponse<T>> {
    return axios.get<T>(`${this.baseUrl}/${id}`)
  }

  // Update an entity by ID
  updateEntity(entity: T, id: number): Promise<AxiosResponse<T>> {
    return axios.put<T>(`${this.baseUrl}/${id}`, entity)
  }

  // Delete an entity by ID
  deleteEntity(id: number): Promise<void> {
    return axios.delete(`${this.baseUrl}/${id}`)
  }
}

export default CRUDService
