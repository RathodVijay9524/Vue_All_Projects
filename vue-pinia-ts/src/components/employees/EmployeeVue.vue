<template>
  <div>
    <h1>Employee Management</h1>
    <router-link to="/employees/add" class="button">Add New Employee</router-link>
    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <EmployeeList v-if="!loading && !error" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import EmployeeList from './EmployeeList.vue'
import { useEmployeeStore } from '../../stores/employeeStore'

const employeeStore = useEmployeeStore()

const loading = computed(() => employeeStore.loading)
const error = computed(() => employeeStore.error)

onMounted(() => {
  employeeStore.fetchEmployees()
})
</script>

<style>
.button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
