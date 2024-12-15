// src/stores/userStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export interface User {
  id: string
  name: string
  email: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    // Fetch users from JSON server
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get<User[]>('http://localhost:3000/users')
        this.users = response.data
      } catch (error) {
        this.error = 'Failed to fetch users.'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    // Create a new user
    async createUser(user: User) {
      try {
        const response = await axios.post<User>('http://localhost:3000/users', user)
        this.users.push(response.data)
      } catch (error) {
        this.error = 'Failed to create user.'
        console.error(error)
      }
    },
    // Update an existing user
    async updateUser(updatedUser: User) {
      try {
        await axios.put(`http://localhost:3000/users/${updatedUser.id}`, updatedUser)
        const index = this.users.findIndex((user) => user.id === updatedUser.id)
        if (index !== -1) {
          this.users[index] = updatedUser
        }
      } catch (error) {
        this.error = 'Failed to update user.'
        console.error(error)
      }
    },
    // Delete a user
    async deleteUser(id: string) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`)
        this.users = this.users.filter((user) => user.id !== id)
      } catch (error) {
        this.error = 'Failed to delete user.'
        console.error(error)
      }
    },
  },
})
