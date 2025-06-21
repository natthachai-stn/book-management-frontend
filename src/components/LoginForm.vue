<script setup lang="ts">
import { ref } from 'vue'
import { useAuthen } from '~/composable/use-authen'
const { login } = useAuthen()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  await login(email.value, password.value)
  alert('Login success')
  navigateTo('/');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-sky-50">
    <div class="w-full max-w-md sm:bg-white p-8 rounded-2xl sm:shadow-xl">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" id="email" type="email" required class="mt-1 w-full px-4 py-2 border rounded-xl" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" id="password" type="password" required
            class="mt-1 w-full px-4 py-2 border rounded-xl" />
        </div>

        <button type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300">
          Sign In
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        <a href="#" class="text-blue-600 hover:underline">Register</a>
      </p>
    </div>
  </div>
</template>
