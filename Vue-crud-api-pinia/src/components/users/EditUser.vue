<template>
  <div>
    <h2>Edit User</h2>
    <form @submit.prevent="updateUser">
      <input v-model="user.name" type="text" placeholder="Name" required />
      <input v-model="user.email" type="email" placeholder="Email" required />
      <button type="submit">Update User</button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()
const user = ref({})
const router = useRouter()

onMounted(async () => {
  const id = route.params.id
  user.value = userStore.users.find((u) => u.id === id)
})

const updateUser = async () => {
  await userStore.updateUser(user.value)
  router.push('/user')
}
</script>
