<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
 
   

    <div class="wrapper">
   

      <nav>
        <RouterLink to="/">Home</RouterLink>|
        <RouterLink to="/user">User</RouterLink>|
        <RouterLink to="/product">Producr</RouterLink>|
        <RouterLink to="reactive">Reactive User</RouterLink>
        

      </nav>
    </div>


  <RouterView />
</template>

<style scoped>



</style>
