<script setup>
import { useProductStore } from '@/stores/productStore';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const router = useRouter();

// Function to navigate to the Edit Product page
const editProduct = (id) => {
  router.push(`editProduct/${id}`);
};

// Function to handle deleting a product
const deleteProduct = (id) => {
  productStore.deleteProduct(id);
};

// Function to handle adding a new product
const addProduct = () => {
  router.push('addProduct');
};
</script>

<template>
  <div>
    <h1>Product List</h1>
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
        <tr v-for="product in productStore.products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.category }}</td>
          <td>
            <button @click="editProduct(product.id)">Edit</button>
            <button @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="addProduct">Add New Product</button>
  </div>
</template>
