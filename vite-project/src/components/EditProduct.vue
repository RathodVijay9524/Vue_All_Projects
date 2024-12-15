<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const id = route.params.id;  // Access the product ID from the route parameters

// Form data for the product
const name = ref('');
const description = ref('');
const price = ref('');
const category = ref('');

// Fetch product details when the component mounts
const fetchProduct = async () => {
  const response = await fetch(`http://localhost:3000/products/${id}`);
  const product = await response.json();

  // Populate the form fields with the fetched product data
  name.value = product.name;
  description.value = product.description;
  price.value = product.price;
  category.value = product.category;
};

// Function to update the product
const updateProduct = async () => {
  // Validate that all fields are filled
  if (!name.value || !description.value || !price.value || !category.value) {
    alert("All fields are required!");
    return;
  }

  // Make PUT request to JSON Server to update the product
  await fetch(`http://localhost:3000/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      name: name.value,
      description: description.value,
      price: price.value,
      category: category.value,
    }),
  });

  // Redirect back to the product list after update
  router.push('/');
};

// Fetch the product details when the component is mounted
onMounted(fetchProduct);
</script>

<template>
  <div>
    <h1>Edit Product</h1>
    <form @submit.prevent="updateProduct">
      <label>Name:</label>
      <input v-model="name" required />

      <label>Description:</label>
      <input v-model="description" required />

      <label>Price:</label>
      <input type="number" v-model="price" required />

      <label>Category:</label>
      <input v-model="category" required />

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
button {
  margin-top: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
