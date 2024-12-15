<template>
  <div>
    <h2>Edit Employee</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="firstName">First Name:</label>
        <input v-model="form.firstName" id="firstName" type="text" />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input v-model="form.lastName" id="lastName" type="text" />
      </div>
      <div>
        <label for="emailId">Email:</label>
        <input v-model="form.emailId" id="emailId" type="email" />
      </div>
      <div>
        <button type="submit">Save Changes</button>
        <button type="button" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEmployeeStore } from '../../stores/employeeStore'

const form = reactive({
  id: 0,
  firstName: '',
  lastName: '',
  emailId: '',
})

const router = useRouter()
const route = useRoute()
const employeeStore = useEmployeeStore()

const id = Number(route.params.id)

onMounted(async () => {
  try {
    const employee = await employeeStore.fetchEmployeeById(id)
    console.log('Fetched Employee:', employee) // Log the fetched data
    if (employee) {
      form.id = employee.id
      form.firstName = employee.firstName
      form.lastName = employee.lastName
      form.emailId = employee.emailId
    } else {
      throw new Error('Employee not found')
    }
  } catch (error) {
    console.error('Failed to fetch employee:', error)
    alert('Failed to load employee data.')
    router.push('/employees') // Redirect back to list
  }
})

const handleSubmit = async () => {
  await employeeStore.updateEmployee({ ...form }, form.id)
  router.push('/employees')
}

const cancel = () => {
  router.push('/employees') // Navigate back to the employee list
}
</script>
