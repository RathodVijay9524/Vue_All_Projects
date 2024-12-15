<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav><RouterLink to="/employees">Employee</RouterLink></nav>
      |
      <nav><RouterLink to="/employeelist">ganrics Employee</RouterLink></nav>
    </div>
  </header>

  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
