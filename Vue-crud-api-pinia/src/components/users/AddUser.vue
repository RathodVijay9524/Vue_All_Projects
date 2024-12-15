<template>
  <div>
    <h2>Add New User</h2>
    <form @submit.prevent="addUser">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const name = ref('')
const email = ref('')

const addUser = async () => {
  const newUser = {
    name: name.value,
    email: email.value,
  }
  await userStore.createUser(newUser)
  router.push('/user')
}
</script>
