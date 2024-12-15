import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:3000/users')
        this.users = response.data
      } catch (error) {
        this.error = 'Failed to fetch users.'
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async createUser(user) {
      try {
        const response = await axios.post('http://localhost:3000/users', user)
        this.users.push(response.data)
      } catch (error) {
        this.error = 'Failed to create user.'
        console.log(error)
      }
    },
    async updateUser(updatedUser) {
      try {
        await axios.put(`http://localhost:3000/users/${updatedUser.id}`, updatedUser)
        const index = this.users.findIndex((user) => user.id === updatedUser.id)
        if (index !== -1) {
          this.users[index] = updatedUser
        }
      } catch (error) {
        this.error = 'Failed to update user.'
        console.log(error)
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`)
        this.users = this.users.filter((user) => user.id !== id)
      } catch (error) {
        this.error = 'Failed to delete user.'
        console.log(error)
      }
    },
  },
})
