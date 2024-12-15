<template>
  <div>
    <router-link to="/employees/add" class="button">Add New Employee</router-link>

    <!-- Show Loading Indicator -->
    <p v-if="loading">Loading...</p>

    <!-- Show Error Message -->
    <p v-if="error">{{ error }}</p>

    <!-- Show Employee List -->
    <table v-if="!loading && !error && employees.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.emailId }}</td>
          <td>
            <router-link :to="{ name: 'editEmployee', params: { id: employee.id } }"
              >Edit</router-link
            >
            |
            <button @click="deleteEmployee(employee.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()

onMounted(() => {
  employeeStore.fetchEmployees()
})

const deleteEmployee = (id: number) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    employeeStore.deleteEmployee(id)
  }
}

const employees = computed(() => employeeStore.employees)
const loading = computed(() => employeeStore.loading)
const error = computed(() => employeeStore.error)
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

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}
</style>
