<script setup>
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';



const router = useRouter();
const userStore = useUserStore();

const name = ref('');
const email = ref('');


// Add a new user using Pinia store
const addUser = async () => {
  if (!name.value || !email.value ) {
    alert("All fields are required!");
    return;
  }

  const newUser = {
    name: name.value,
    email: email.value
  
  };

  await userStore.addUser(newUser);  // Add the new user to the store
  router.push('/user');  // Redirect to the user list
};
</script>

<template>
  <div>
    <h1>Add User</h1>
    <form @submit.prevent="addUser">
      <label>Name:</label>
      <input v-model="name" required />

      <label>Email:</label>
      <input v-model="email" required />
      <button type="submit">Add User</button>
    </form>
  </div>
</template>
