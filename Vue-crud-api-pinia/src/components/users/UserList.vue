<template>
  <div>
    <h2>User List</h2>
    <ul v-if="!userStore.loading">
      <li v-for="user in userStore.users" :key="user.id">
        <span>{{ user.name }}</span>
        <span>{{ user.email }}</span>
        <router-link :to="`/user/edit/${user.id}`">Edit</router-link>
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
    <p v-if="userStore.loading">Loading...</p>
    <p v-if="userStore.error">{{ userStore.error }}</p>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()

const deleteUser = async (id) => {
  await userStore.deleteUser(id)
}
</script>
