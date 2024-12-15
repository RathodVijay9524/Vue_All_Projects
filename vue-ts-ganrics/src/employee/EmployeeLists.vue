<template>
  <div>
    <h1>Employee List</h1>
    <button @click="fetchAllEmployees">Refresh</button>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <ul>
      <li v-for="employee in employees" :key="employee.id">
        {{ employee.firstName }} {{ employee.lastName }} ({{ employee.emailId }})
        <button @click="editEmployee(employee.id)">Edit</button>
        <button @click="deleteEmployee(employee.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useEmployeesStore } from '@/stores/ganrics/employeeStore'
import { onMounted } from 'vue'

const employeeStore = useEmployeesStore()

const { items: employees, loading, error, fetchAll, deleteItem } = employeeStore

const fetchAllEmployees = async () => {
  await fetchAll()
}

const editEmployee = (id: number) => {
  // Redirect to edit page with ID
  console.log(`Edit employee with ID ${id}`)
}

const deleteEmployee = async (id: number) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    await deleteItem(id)
  }
}

onMounted(() => {
  fetchAllEmployees()
})
</script>
