<script setup lang="ts">
import { ref } from 'vue'
const nuxtApp = useNuxtApp();

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
})

const resetForm= ()=>{
  form.value={
  firstname: '',
  lastname: '',
  email: '',
  password: '',
}
}
const handleRegister = async () => {
  await nuxtApp.$axios.post('/user/register', {
    email: form.value.email,
    password: form.value.password,
    firstname: form.value.firstname,
    lastname: form.value.lastname,
  })
  alert('Register success')
  resetForm()
  navigateTo('/login');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-sky-50">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl sm:shadow-xl">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
       <form  @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label for="firstname" class="block text-sm font-medium text-gray-700">Firstname</label>
          <input v-model="form.firstname" id="firstname" type="firstname" required
            class="mt-1 w-full px-4 py-2 border rounded-xl" />
        </div>
        <div>
          <label for="lastname" class="block text-sm font-medium text-gray-700">Lastname</label>
          <input v-model="form.lastname" id="lastname" type="lastname" required
            class="mt-1 w-full px-4 py-2 border rounded-xl" />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" id="email" type="email" required
            class="mt-1 w-full px-4 py-2 border rounded-xl" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="form.password" id="password" type="password" required
            class="mt-1 w-full px-4 py-2 border rounded-xl" />
        </div>

        <button type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300">
          Register account
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        <a href="/login"
          class="text-blue-600 hover:underline cursor-pointer">Go to Log in</a>
      </p>
    </div>
  </div>
</template>
