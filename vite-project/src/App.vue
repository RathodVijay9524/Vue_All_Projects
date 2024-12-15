<template>
  <div id="app">
    <nav>
      <router-link to="/">Product Managements</router-link>
      <router-link to="/users">User Mangagments</router-link>
      <router-link to="/reactive">Reactive</router-link>
      
    </nav>
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
nav {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}
nav a {
  text-decoration: none;
  color: #4caf50;
  font-weight: bold;
}
nav a.router-link-active {
  color: #f44336;
}
</style>
