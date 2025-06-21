<script setup>
import { useBookStore } from '../store/book'

const bookStore = useBookStore()

const validateForm = () => {
    console.log('formState.value :>> ', bookStore.formState);
    const { title, author, published_year, genre } = bookStore.formState
    const errors = []

    if (!title.trim()) errors.push('Title is required')
    if (!author.trim()) errors.push('Author is required')
    if (!genre.trim()) errors.push('Genre is required')
    if (!published_year.match(/^\d{4}$/)) errors.push('Publish Year must be 4-digit year')

    return errors
}
const handleSubmit = () => {
    const errors = validateForm()
    if (errors.length > 0) {
        alert(errors.join('\n'))
        return
    }
    bookStore.saveBook()
}

</script>

<template>
    <div v-if="bookStore.showModal"
        class="fixed inset-0 z-50 bg-gray-400/80 transition-opacity flex items-center justify-center">
        <div class="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">
            <h2 class="text-lg font-semibold mb-4">
                {{ bookStore.isEditMode ? 'Edit Book' : 'Add Book' }}
            </h2>

            <slot />

            <!-- actions -->
            <div class="pt-4 justify-end sm:flex sm:flex-row">
                <button type="submit" @click="handleSubmit"
                    class="cursor-pointer inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-600/80 sm:mr-3 sm:w-auto">
                    Confirm
                </button>
                <button type="button" @click="bookStore.closeModal"
                    class="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 sm:mt-0 sm:w-auto">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>
