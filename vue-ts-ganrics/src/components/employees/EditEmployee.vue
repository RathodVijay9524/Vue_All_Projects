<template>
  <div>
    <h1>Edit Employee</h1>
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
        <button type="submit">Update Employee</button> |
        <router-link to="/employees" class="button">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'

import { useRoute, useRouter } from 'vue-router'
import type { Employee } from '@/service/Employee'

const employeeStore = useEmployeeStore()
const router = useRouter()
const route = useRoute()

// Get employee ID from the route params
const employeeId = parseInt(route.params.id as string)

const employee = ref<Employee>({
  id: 0,
  firstName: '',
  lastName: '',
  emailId: '',
})

// Fetch the employee data when the component is mounted
onMounted(async () => {
  try {
    const data = await employeeStore.fetchEmployeeById(employeeId)
    employee.value = data
  } catch (error) {
    console.error('Failed to fetch employee:', error)
  }
})

const submitForm = async () => {
  try {
    await employeeStore.updateEmployee(employee.value, employee.value.id)
    // Redirect to the employee list after updating
    router.push('/employees')
  } catch (error) {
    console.error('Failed to update employee:', error)
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
