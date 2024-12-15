<template>
  <div class="app">
    <h1>CRUD Application</h1>

    <form @submit.prevent="addUser">
      <input v-model="newUser.name" type="text" placeholder="Name" required />
      <input v-model="newUser.email" type="email" placeholder="Email" required />
      <button type="submit">{{ editMode ? 'Update User' : 'Add User' }}</button>
    </form>

    <ul>
      <li v-for="user in users" :key="user.id">
        <span>{{ user.name }} ({{ user.email }})</span>
        <button @click="editUser(user)">Edit</button>
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// Reactive state for users
const users = reactive([
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]);

// Ref for the new user input and edit mode
const newUser = reactive({
  id: null,
  name: '',
  email: '',
});
const editMode = ref(false);

// Add a new user or update an existing one
function addUser() {
  if (editMode.value) {
    const index = users.findIndex(user => user.id === newUser.id);
    if (index !== -1) {
      users[index] = { ...newUser };
    }
    editMode.value = false;
  } else {
    const id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
    users.push({ id, ...newUser });
  }
  resetForm();
}

// Edit a user
function editUser(user) {
  newUser.id = user.id;
  newUser.name = user.name;
  newUser.email = user.email;
  editMode.value = true;
}

// Delete a user
function deleteUser(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
}

// Reset the form
function resetForm() {
  newUser.id = null;
  newUser.name = '';
  newUser.email = '';
}
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}
button:hover {
  background-color: #0056b3;
}
</style>
