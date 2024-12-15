<template>
  <table>
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
          <router-link :to="{ name: 'editEmployee', params: { id: employee.id } }">
            Edit </router-link
          >|
          <button @click="deleteEmployee(employee.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEmployeeStore } from '../../stores/employeeStore'

const employeeStore = useEmployeeStore()
console.log(employeeStore.employees.values)
const employees = computed(() => employeeStore.employees)

const deleteEmployee = (id: number) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    employeeStore.deleteEmployee(id)
  }
}
</script>

<style>
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
