// src/stores/userStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: []
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users');
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users", error);
      }
    },
    async addUser(user) {
      try {
        const response = await axios.post('http://localhost:3000/users', user);
        this.users.push(response.data);  // Add the new user to the store
      } catch (error) {
        console.error("Error adding user", error);
      }
    },
    async updateUser(updatedUser) {
      try {
        const response = await axios.put(`http://localhost:3000/users/${updatedUser.id}`, updatedUser);
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating user", error);
      }
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:3000/users/${userId}`);
        this.users = this.users.filter(user => user.id !== userId);
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  }
});
