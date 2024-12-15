<template>
  <div>
    <h1>Add New Employee</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="employee.firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="employee.lastName" required />
      </div>
      <div>
        <label for="emailId">Email:</label>
        <input type="email" id="emailId" v-model="employee.emailId" required />
      </div>
      <div>
        <button type="submit">Save Employee</button> |
        <router-link to="/employees" class="button">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'
import type { Employee } from '@/service/Employee'
import { useRouter } from 'vue-router'

const employeeStore = useEmployeeStore()
const router = useRouter()
// Employee data model
const employee = ref<Employee>({
  id: 0, // id is 0 because it's not assigned yet when adding
  firstName: '',
  lastName: '',
  emailId: '',
})

const submitForm = async () => {
  try {
    await employeeStore.addEmployee(employee.value)
    // Redirect to the employee list after adding
    router.push('/employees')
  } catch (error) {
    console.error('Failed to add employee:', error)
  }
}
</script>

<style scoped>
/* Add custom styles for the form */
form {
  width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
