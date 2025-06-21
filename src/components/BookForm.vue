<script setup lang="ts">
import type { BookFormProp } from '~/interface/BookFormProp';
import { useBookStore } from '../store/book'

const bookStore = useBookStore()

const items: BookFormProp[] = [
    { label: 'Title', name: 'title' },
    { label: 'Author', name: 'author' },
    { label: 'Publish Year', name: 'published_year' },
    { label: 'Genre', name: 'genre' }
]

const handleInput = (item: BookFormProp, e: Event) => {
    const val = (e.target as HTMLInputElement).value
    bookStore.formState[item.name] = item.name === 'published_year' ? val.replace(/\D/g, '') : val
}
</script>

<template>
    <form class="space-y-4">
        <div v-for="(item, i) in items" :key="i">
            <label :for="item.name" class="block text-sm font-medium text-gray-900 my-2">{{ item.label }}</label>
            <div
                class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-400">
                <input type="text" :id="item.name" :name="item.name" v-model="bookStore.formState[item.name]"
                    @input="(e) => handleInput(item, e)" required
                    class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm" />
            </div>
        </div>
    </form>
</template>
