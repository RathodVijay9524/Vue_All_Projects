import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    products: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    EDIT_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex((product) => product.id === updatedProduct.id)
      if (index !== -1) {
        state.products[index] = updatedProduct
      }
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter((product) => product.id !== productId)
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get('http://localhost:3000/products')
        commit('SET_PRODUCTS', response.data)
      } catch (error) {
        commit('SET_ERROR', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async addProduct({ commit }, product) {
      try {
        const response = await axios.post('http://localhost:3000/products', product)
        commit('ADD_PRODUCT', response.data)
      } catch (error) {
        commit('SET_ERROR', error)
      }
    },
    async editProduct({ commit }, product) {
      try {
        const response = await axios.put(`http://localhost:3000/products/${product.id}`, product)
        commit('EDIT_PRODUCT', response.data)
      } catch (error) {
        commit('SET_ERROR', error)
      }
    },
    async deleteProduct({ commit }, productId) {
      try {
        await axios.delete(`http://localhost:3000/products/${productId}`)
        commit('DELETE_PRODUCT', productId)
      } catch (error) {
        commit('SET_ERROR', error)
      }
    },
  },
})

export default store
