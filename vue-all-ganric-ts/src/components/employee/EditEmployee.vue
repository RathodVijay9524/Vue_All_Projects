<template>
  <div class="edit-employee-container">
    <h1>Edit Employee</h1>
    <form @submit.prevent="updateEmployeeDetails" class="employee-form">
      <div v-if="message" class="success-message">{{ message }}</div>
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
        <button type="submit" class="btn btn-primary">Update Employee</button>
        <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from '@/services/EmployeeStore'
import { reactive, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const employeeStore = useEmployeeStore()
const { fetchById, updateItem } = employeeStore
const router = useRouter()
const route = useRoute()

const employee = reactive({
  id: 0,
  firstName: '',
  lastName: '',
  emailId: '',
})

const message = ref<string | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  const data = await fetchById(id)
  if (data) {
    Object.assign(employee, data) // Populate the form with fetched employee data
  }
})

const updateEmployeeDetails = async () => {
  if (employee.id) {
    await updateItem(employee, employee.id)
    message.value = 'Employee updated successfully'
    setTimeout(() => {
      message.value = null
      router.push('/employees') // Redirect to employee list after updating
    }, 2000)
  }
}
const cancel = () => {
  router.push('/employees') // Redirect back to employee list on cancel
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
.edit-employee-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
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
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
}

input {
  padding: 8px;
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
</style>
