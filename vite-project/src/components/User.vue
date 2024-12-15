<script setup>
import { ref, onMounted } from "vue";
import UserList from "./UserList.vue";


const userList = ref([]);

// Fetch users from JSON Server
const fetchUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  userList.value = await response.json();
};

// Add a new user
const addUser = async () => {
  const name = prompt("Enter new user name:");
  const email = prompt("Enter new user email:");
  if (name && email) {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const newUser = await response.json();
    userList.value.push(newUser);
  }
};

// Edit a user
const editUser = async (id) => {
  const user = userList.value.find((u) => u.id === id);
  if (user) {
    const newName = prompt("Enter new name:", user.name);
    const newEmail = prompt("Enter new email:", user.email);
    if (newName && newEmail) {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, name: newName, email: newEmail }),
      });
      const updatedUser = await response.json();
      Object.assign(user, updatedUser);
    }
  }
};

// Delete a user
const deleteUser = async (id) => {
  if (confirm("Are you sure you want to delete this user?")) {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    userList.value = userList.value.filter((u) => u.id !== id);
  }
};

// Fetch users on component mount
onMounted(fetchUsers);
</script>

<template>
  <button @click="addUser">Add User</button>
  <UserList :users="userList" @edit="editUser" @delete="deleteUser" />
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}
button {
  margin-bottom: 20px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  background-color: #4caf50;
  color: white;
}
</style>
