<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
import BaseModal from '../components/BaseModal.vue'
import BookForm from '../components/BookForm.vue'
import TableData from '../components/TableData.vue'
import DeleteModal from '../components/DeleteModal.vue'
import { useBookStore } from '../store/book'
import { useAuthen } from '~/composable/use-authen'
const { logout, user } = useAuthen()
const bookStore = useBookStore()
</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <div class="flex items-center justify-center flex-col sm:flex-row">
      <span class="text-3xl font-bold text-center">📑</span>
      <span class="text-3xl font-bold text-center">Book Management</span>
    </div>


    <div>
      Welcome '{{ user?.fullname }}'
    </div>

    <!-- add button -->
    <div class="my-4 flex justify-between">
      <button type="button" @click="logout"
        class="inline-flex w-1/3 justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-600/80 sm:mr-3 sm:w-auto cursor-pointer">
        Log out
      </button>
      <button type="button" @click="bookStore.openAddModal"
        class="inline-flex w-1/3 justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-600/80 sm:mr-3 sm:w-auto cursor-pointer">
        + Book
      </button>
    </div>

    <!-- table -->
    <TableData />

    <!-- modal -->
    <BaseModal>
      <BookForm />
    </BaseModal>
    <DeleteModal />

  </div>
</template>