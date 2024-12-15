import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('productStorePinia', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const response = await axios.get('http://localhost:3000/products')
        this.products = response.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async addProduct(product) {
      try {
        const response = await axios.post('http://localhost:3000/products', product)
        this.products.push(response.data)
      } catch (error) {
        this.error = error
      }
    },
    async editProduct(product) {
      try {
        const response = await axios.put(`http://localhost:3000/products/${product.id}`, product)
        const index = this.products.findIndex((p) => p.id === product.id)
        if (index !== -1) {
          this.products[index] = response.data
        }
      } catch (error) {
        this.error = error
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`http://localhost:3000/products/${productId}`)
        this.products = this.products.filter((product) => product.id !== productId)
      } catch (error) {
        this.error = error
      }
    },
  },
})
