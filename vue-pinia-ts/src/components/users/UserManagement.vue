<template>
  <div>
    <router-link to="/user/add">Add New User</router-link>
    <UserList />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../../stores/useUserStore'
import UserList from './UserList.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>
