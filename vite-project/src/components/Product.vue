<script setup>
import { ref, onMounted } from "vue";
import ProductList from "./ProductList.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const products = ref([]);

// Fetch products from JSON Server
const fetchProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  products.value = await response.json();
};

// Delete a product
const deleteProduct = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    products.value = products.value.filter((p) => p.id !== id);
  }
};

// Fetch data on mount
onMounted(fetchProducts);
</script>

<template>
  <div>
   
    <button @click="router.push('/add-product')">Add Product</button>
    <ProductList :products="products" @delete="deleteProduct" />
  </div>
</template>

<style>
h1 {
  margin-bottom: 20px;
}
button {
  margin-bottom: 20px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  background-color: #4caf50;
  color: white;
}
</style>
