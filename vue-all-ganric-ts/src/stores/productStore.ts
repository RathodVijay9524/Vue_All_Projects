import { APIService } from '@/services/CRUDServices'
import { useCRUDStore } from '@/services/CRUDStore'
import { defineStore } from 'pinia'

interface Product {
  id: number
  name: string
  price: number
}

const productService = new APIService<Product>('http://localhost:9090/api/v1/products')

export const useProductStore = defineStore('productStore', () => {
  return useCRUDStore<Product>(productService)
})
