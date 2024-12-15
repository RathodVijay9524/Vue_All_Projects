<script setup>
import { useUserStore } from '@/stores/userStore';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const id = route.params.id;
const user = userStore.users.find(u => u.id === id);

const name = ref(user?.name || '');
const email = ref(user?.email || '');


// Update the user using Pinia store
const updateUser = async () => {
  if (!name.value || !email.value ) {
    alert("All fields are required!");
    return;
  }

  const updatedUser = {
    id: user.id,
    name: name.value,
    email: email.value,
   
  };

  await userStore.updateUser(updatedUser);
  router.push('/user');  // Redirect to the user list
};
</script>

<template>
  <div>
    <h1>Edit User</h1>
    <form @submit.prevent="updateUser">
      <label>Name:</label>
      <input v-model="name" required />

      <label>Email:</label>
      <input v-model="email" required />

    

      <button type="submit">Update User</button>
    </form>
  </div>
</template>
