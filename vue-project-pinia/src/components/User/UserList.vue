<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

// Function to navigate to the Edit User page
const editUser = (id) => {
  router.push(`/user/edit/${id}`);
};

// Function to handle deleting a user
const deleteUser = (id) => {
  userStore.deleteUser(id);
};

// Function to handle adding a new user
const addUser = () => {
  router.push('/user/add');
};
</script>

<template>
  <div>
    <h1>User List</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="editUser(user.id)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="addUser">Add New User</button>
  </div>
</template>
