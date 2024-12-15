import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useStore = defineStore('userStore', () => {
  // Reactive state for users
  const users = reactive([
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ]);

  // Add a new user or update an existing one
  function addUser(newUser, editMode) {
    if (editMode) {
      const index = users.findIndex(user => user.id === newUser.id);
      if (index !== -1) {
        users[index] = { ...newUser };
      }
    } else {
      const id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
      users.push({ id, ...newUser });
    }
  }

  // Delete a user
  function deleteUser(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  }

  return {
    users,
    addUser,
    deleteUser,
  };
});
