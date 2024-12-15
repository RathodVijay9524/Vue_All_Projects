<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();

const id = route.params.id;
const product = productStore.products.find(p => p.id === id);

const name = ref(product?.name || '');
const description = ref(product?.description || '');
const price = ref(product?.price || '');
const category = ref(product?.category || '');

// Update the product using Pinia store
const updateProduct = async () => {
  if (!name.value || !description.value || !price.value || !category.value) {
    alert("All fields are required!");
    return;
  }

  const updatedProduct = {
    id: product.id,
    name: name.value,
    description: description.value,
    price: price.value,
    category: category.value
  };

  await productStore.updateProduct(updatedProduct);
  router.push('product');  // Redirect to the product list
};
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
      <input v-model="price" required />

      <label>Category:</label>
      <input v-model="category" required />

      <button type="submit">Update Product</button>
    </form>
  </div>
</template>
