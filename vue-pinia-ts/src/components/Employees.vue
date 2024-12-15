<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="app">
    <h1>Employee Manager</h1>

    <form @submit.prevent="submitEmployee">
      <input v-model="employeeForm.firstName" type="text" placeholder="First Name" required />
      <input v-model="employeeForm.lastName" type="text" placeholder="Last Name" required />
      <input v-model="employeeForm.emailId" type="email" placeholder="Email" required />
      <button type="submit">{{ isEditing ? 'Update Employee' : 'Add Employee' }}</button>
    </form>

    <ul>
      <li v-for="employee in employees" :key="employee.id">
        <span>{{ employee.firstName }} {{ employee.lastName }} ({{ employee.emailId }})</span>
        <button @click="editEmployee(employee)">Edit</button>
        <button @click="deleteEmployee(employee.id)">Delete</button>
      </li>
    </ul>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import EmployeeService from '../stores/EmployeeService'

interface Employee {
  id: number
  firstName: string
  lastName: string
  emailId: string
}

const employees = ref<Employee[]>([])
const employeeForm = reactive<Partial<Employee>>({
  firstName: '',
  lastName: '',
  emailId: '',
})
const isEditing = ref(false)
const currentEditingId = ref<number | null>(null)
const error = ref<string | null>(null)

// Fetch employees on component mount
onMounted(async () => {
  try {
    const response = await EmployeeService.getEmployees()
    employees.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch employees.'
    console.error(err)
  }
})

// Add or update an employee
const submitEmployee = async () => {
  try {
    if (isEditing.value && currentEditingId.value !== null) {
      // Update employee
      const response = await EmployeeService.updateEmployee(
        {
          id: currentEditingId.value,
          firstName: employeeForm.firstName!,
          lastName: employeeForm.lastName!,
          emailId: employeeForm.emailId!,
        },
        currentEditingId.value,
      )
      const index = employees.value.findIndex((emp) => emp.id === currentEditingId.value)
      if (index !== -1) employees.value[index] = response.data
      isEditing.value = false
      currentEditingId.value = null
    } else {
      // Add new employee
      const response = await EmployeeService.saveEmployee({
        firstName: employeeForm.firstName!,
        lastName: employeeForm.lastName!,
        emailId: employeeForm.emailId!,
      } as Employee)
      employees.value.push(response.data)
    }
    resetForm()
  } catch (err) {
    error.value = 'Failed to save employee.'
    console.error(err)
  }
}

// Edit employee
const editEmployee = (employee: Employee) => {
  employeeForm.firstName = employee.firstName
  employeeForm.lastName = employee.lastName
  employeeForm.emailId = employee.emailId
  currentEditingId.value = employee.id
  isEditing.value = true
}

// Delete employee
const deleteEmployee = async (id: number) => {
  try {
    await EmployeeService.deleteEmployee(id)
    employees.value = employees.value.filter((emp) => emp.id !== id)
  } catch (err) {
    error.value = 'Failed to delete employee.'
    console.error(err)
  }
}

// Reset form
const resetForm = () => {
  employeeForm.firstName = ''
  employeeForm.lastName = ''
  employeeForm.emailId = ''
  isEditing.value = false
  currentEditingId.value = null
}
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}
button:hover {
  background-color: #0056b3;
}
.error {
  color: red;
  margin-top: 20px;
}
</style>
