<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/user">User Management</RouterLink> |
        <RouterLink to="/employee">Emp Management</RouterLink> |
        <RouterLink to="/employees">Employee Management</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
