<template>
  <div class="add-employee-container">
    <h1>Add Employee</h1>
    <form @submit.prevent="submitForm" class="employee-form">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input v-model="employee.firstName" id="firstName" type="text" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input v-model="employee.lastName" id="lastName" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="employee.emailId" id="email" type="email" required />
      </div>
      <div class="button-group">
        <button type="submit" class="btn btn-primary">Add Employee</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        <button type="button" class="btn btn-danger" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from '@/services/EmployeeStore'
import { reactive } from 'vue'

import { useRouter } from 'vue-router'

const employeeStore = useEmployeeStore()
const { addItem } = employeeStore
const router = useRouter()

const employee = reactive({
  id: null,
  firstName: '',
  lastName: '',
  emailId: '',
})

const submitForm = async () => {
  await addItem(employee)
  router.push('/employees')
}

const clearForm = () => {
  employee.firstName = ''
  employee.lastName = ''
  employee.emailId = ''
}

const cancel = () => {
  router.push('/employees')
}
</script>

<style scoped>
.add-employee-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.employee-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}

input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
