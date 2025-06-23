<script setup>
import { useBookStore } from '../store/book'

const bookStore = useBookStore()
</script>

<template>
    <div v-if="bookStore.showDeleteModal"
        class="fixed inset-0 z-50 bg-gray-400/40 transition-opacity flex items-center justify-center">
        <div class="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg m-2">
            <span>
                Do you really want to delete this book?
            </span>
            <!-- actions -->
            <div class="pt-4 justify-end sm:flex sm:flex-row">
                <button type="button" @click="bookStore.closeModal"
                    class="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 my-3 sm:my-0 sm:w-auto sm:mr-3 ">
                    Cancel
                </button>
                <button type="submit" @click="bookStore.deleteBook"
                    class="cursor-pointer inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-600/80 sm:w-auto">
                    Confirm
                </button>
            </div>
        </div>

    </div>
</template>