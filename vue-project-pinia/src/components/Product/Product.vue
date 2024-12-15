<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import ProductList from './ProductList.vue';

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();  // Fetch products when the app loads
  console.log(productStore.fetchProducts());
});
</script>

<template>
  <div>
    <ProductList />
  </div>
</template>
