<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Form data for the new product
const name = ref("");
const description = ref("");
const price = ref("");
const category = ref("");

// Function to add a new product
const addProduct = async () => {
  // Validate that all fields are filled
  if (!name.value || !description.value || !price.value || !category.value) {
    alert("All fields are required!");
    return;
  }

  // Make POST request to JSON Server
  await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      description: description.value,
      price: price.value,
      category: category.value,
    }),
  });

  // Redirect to product list
  router.push("/");
};
</script>

<template>
  <div>
    <h1>Add Product</h1>
    <form @submit.prevent="addProduct">
      <label>Name:</label>
      <input v-model="name" required />

      <label>Description:</label>
      <input v-model="description" required />

      <label>Price:</label>
      <input type="number" v-model="price" required />

      <label>Category:</label>
      <input v-model="category" required />

      <button type="submit">Add Product</button>
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
