<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import UserList from './UserList.vue';

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUsers();  // Fetch users when the app loads
});
</script>

<template>
  <div>
    <UserList />
  </div>
</template>
