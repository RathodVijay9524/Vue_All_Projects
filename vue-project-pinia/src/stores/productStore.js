// src/stores/productStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: []
  }),
  actions: {
    // Fetch products from the mock server
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products", error);
      }
    },
    
    // Add a new product using POST request
    async addProduct(newProduct) {
      try {
        const response = await axios.post('http://localhost:3000/products', newProduct);
        this.products.push(response.data);  // Add the new product to the store
      } catch (error) {
        console.error("Error adding product", error);
      }
    },
    
    // Update an existing product using PUT request
    async updateProduct(updatedProduct) {
      try {
        const response = await axios.put(`http://localhost:3000/products/${updatedProduct.id}`, updatedProduct);
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = response.data;  // Update the product in the store
        }
      } catch (error) {
        console.error("Error updating product", error);
      }
    },
    
    // Delete a product using DELETE request
    async deleteProduct(productId) {
      try {
        await axios.delete(`http://localhost:3000/products/${productId}`);
        this.products = this.products.filter(product => product.id !== productId);  // Remove product from the store
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  }
});
