<template>
  <div class="employee-list-container">
    <h1>Employee List</h1>
    <button class="btn btn-add" @click="navigateToAdd">Add Employee</button>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="message" class="success-message">{{ message }}</div>

    <table v-if="employees.length" class="employee-table">
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
            <button class="btn btn-edit" @click="navigateToEdit(employee.id)">Edit</button> |
            <button class="btn btn-delete" @click="confirmDelete(employee.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from '@/services/EmployeeStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const employeeStore = useEmployeeStore()
const { fetchAll, deleteItem } = employeeStore
const { items: employees, loading, error } = employeeStore
const router = useRouter()
const message = ref<string | null>(null)

onMounted(() => {
  fetchAll()
})
const deleteEmployee = async (id: number) => {
  await deleteItem(id)
  message.value = 'Employee deleted successfully'
  setTimeout(() => {
    message.value = null
  }, 3000)
}

const confirmDelete = (id: number) => {
  const isConfirmed = window.confirm('Are you sure you want to delete this employee?')
  if (isConfirmed) {
    deleteEmployee(id)
  }
}

const navigateToAdd = () => {
  router.push('/employees/add')
}

const navigateToEdit = (id: number) => {
  router.push(`/employees/edit/${id}`)
}
</script>

<style scoped>
.success-message {
  color: green;
  font-weight: bold;
  margin-top: 20px;
  background-color: #d4edda;
  padding: 10px;
  border-radius: 5px;
}
.employee-list-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.btn {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.btn-add {
  background-color: #007bff;
  color: #fff;
  margin-bottom: 15px;
}

.btn-add:hover {
  background-color: #0056b3;
}

.btn-edit {
  background-color: #28a745;
  color: #fff;
}

.btn-edit:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
  color: #fff;
}

.btn-delete:hover {
  background-color: #c82333;
}

.loading {
  text-align: center;
  color: #007bff;
  font-size: 16px;
  margin-top: 15px;
}

.error {
  text-align: center;
  color: #dc3545;
  font-size: 16px;
  margin-top: 15px;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.employee-table th,
.employee-table td {
  text-align: left;
  padding: 10px;
  border: 1px solid #ddd;
}

.employee-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.employee-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.employee-table tr:hover {
  background-color: #f1f1f1;
}

.employee-table td {
  vertical-align: middle;
}

.employee-table button {
  margin: 0;
}
</style>
