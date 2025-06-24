<script setup lang="ts">
import { ref } from 'vue'
import { useAuthen } from '~/composable/use-authen'
const { login } = useAuthen()

const form = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  await login(form.value.email, form.value.password)
  navigateTo('/');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-sky-50">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl sm:shadow-xl">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-5">
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
          Login In
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        <a href="/register"
          class="text-blue-600 hover:underline cursor-pointer">Register</a>
      </p>
    </div>
  </div>
</template>
