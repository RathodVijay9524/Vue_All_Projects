<template>
  <div>
    <h1>User Management</h1>
    <router-link to="/user/add">Add New User</router-link>
    <UserList />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import UserList from '@/components/users/UserList.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>
