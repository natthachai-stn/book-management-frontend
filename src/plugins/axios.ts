import axios from 'axios';

export default defineNuxtPlugin(() => {
  const cookieAuthToken = useCookie('auth_token')
  const runtimeConfig = useRuntimeConfig()

  const instance = axios.create({
    baseURL: runtimeConfig.public.BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    if (cookieAuthToken.value) {
      config.headers.Authorization = `Bearer ${cookieAuthToken.value}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403) {
        useCookie('auth_token').value = null
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