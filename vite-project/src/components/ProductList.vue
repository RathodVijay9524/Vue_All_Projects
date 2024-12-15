<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.category }}</td>
        <td>
          
          <button @click="editProduct(product.id)">Edit</button>
          <button @click="$emit('delete', product.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();
defineProps({
  products: {
    type: Array,
    required: true,
  },
});

defineEmits(["delete"]);

// Function to navigate to the Edit Product page
const editProduct = (id) => {
  router.push(`/edit-product/${id}`);
};

</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
}
button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}
button:first-of-type {
  background-color: #2196f3;
  color: white;
}
button:last-of-type {
  background-color: #f44336;
  color: white;
}
</style>
