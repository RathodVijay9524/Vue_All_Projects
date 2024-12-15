<template>
  <div>
    <h1>Edit Employee</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="form.firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="form.lastName" required />
      </div>
      <div>
        <label for="emailId">Email:</label>
        <input type="email" id="emailId" v-model="form.emailId" required />
      </div>
      <button type="submit">Save</button>
      <button type="button" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useEmployeeStore } from '../../stores/employeeStore'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const employeeStore = useEmployeeStore()

const form = reactive({
  id: 0,
  firstName: '',
  lastName: '',
  emailId: '',
})

// Fetch employee details when component is mounted
onMounted(async () => {
  const id = Number(route.params.id)
  try {
    const employee = await employeeStore.fetchEmployeeById(id)
    form.id = employee.id
    form.firstName = employee.firstName
    form.lastName = employee.lastName
    form.emailId = employee.emailId
  } catch (error) {
    alert('Failed to load employee data.')
    console.log(error)
    router.push('/employees') // Navigate back to employee list
  }
})

const handleSubmit = async () => {
  await employeeStore.updateEmployee({ ...form }, form.id) // Update employee
  router.push('/employees') // Navigate back to employee list
}

const cancel = () => {
  router.push('/employees') // Navigate back to employee list
}
</script>
