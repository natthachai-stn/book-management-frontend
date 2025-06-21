import axios from 'axios';
import { useAuthen } from '~/composable/use-authen';

export default defineNuxtPlugin(() => {
  const { token } = useAuthen();
  const runtimeConfig = useRuntimeConfig()

  const instance = axios.create({
    baseURL: runtimeConfig.public.BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403) {
        localStorage.removeItem('auth_token');
        navigateTo('/login');
      }
      return Promise.reject(error);
    },
  );

  return {
    provide: {
      axios: instance,
    },
  };
});