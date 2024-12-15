<template>
  <form @submit.prevent="saveEmployee">
    <div>
      <label for="firstName">First Name:</label>
      <input id="firstName" v-model="form.firstName" required />
    </div>
    <div>
      <label for="lastName">Last Name:</label>
      <input id="lastName" v-model="form.lastName" required />
    </div>
    <div>
      <label for="emailId">Email:</label>
      <input id="emailId" v-model="form.emailId" required />
    </div>
    <div>
      <button type="submit">Add Employee</button>
      <button type="button" @click="cancel">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useEmployeeStore } from '../../stores/employeeStore'
import { Employee } from '../../stores/Employee'

const router = useRouter()
const employeeStore = useEmployeeStore()
const form = reactive<Partial<Employee>>({
  firstName: '',
  lastName: '',
  emailId: '',
})

const saveEmployee = async () => {
  await employeeStore.addEmployee(form as Employee)
  router.push('/employees')
}

const cancel = () => {
  router.push('/employees') // Navigate back to the employee list
}
</script>
