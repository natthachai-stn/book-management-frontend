<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useBookStore, type BookForm } from '../store/book'
import type { BookResp } from '~/interface/BookResp';
const nuxtApp = useNuxtApp();
const bookStore = useBookStore()
dayjs.extend(utc)
dayjs.extend(timezone)

const currentPage = ref(1)
const pageSize = 10
const totalPages = ref(1)
const books = ref<BookForm[]>([])

const fetchData = async () => {
  const { data: booksData } = await nuxtApp.$axios.get<BookResp>(`/book?page=${currentPage.value}&pageSize=${pageSize}`)
  books.value = booksData.data
  totalPages.value = Math.ceil((booksData.total || 0) / pageSize)
}

const maxPaginate = 5
const paginationRange = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const showPaginate = Math.floor(maxPaginate / 2)

  if (total <= maxPaginate + 2) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  let start = Math.max(2, current - showPaginate)
  let end = Math.min(total - 1, current + showPaginate)

  if (current <= showPaginate + 2) {
    start = 2
    end = maxPaginate
  }

  if (current >= total - showPaginate - 1) {
    start = total - maxPaginate + 1
    end = total - 1
  }

  const pages = []

  if (start > 2) pages.push('...')
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  if (end < total - 1) pages.push('...')

  return [1, ...pages, total]
})

watch(() => bookStore.fetchKey,
  fetchData,
  { deep: true }
)
watch(currentPage, fetchData)
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden rounded-t-xl shadow">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr class="text-left text-sm text-gray-800">
              <th class="p-3 w-[10%] border-r-1 border-gray-300">ID</th>
              <th class="p-3 w-[15%] border-r-1 border-gray-300">Book Name</th>
              <th class="p-3 w-[15%] border-r-1 border-gray-300">Author</th>
              <th class="p-3 w-[15%] border-r-1 border-gray-300">Published Year</th>
              <th class="p-3 w-[15%] border-r-1 border-gray-300">Genre</th>
              <th class="p-3 w-[15%] border-r-1 border-gray-300">Created At</th>
              <th class="p-3 w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-left text-sm text-gray-800" v-for="(book, i) in books" :key='i'>
              <td class="p-3 w-[10%] border-r-1 border-b-1 border-gray-300">{{ book.id }}</td>
              <td class="p-3 w-[15%] border-r-1 border-b-1 border-gray-300">{{ book.title }}</td>
              <td class="p-3 w-[15%] border-r-1 border-b-1 border-gray-300">{{ book.author }}</td>
              <td class="p-3 w-[15%] border-r-1 border-b-1 border-gray-300">{{ book.published_year }}</td>
              <td class="p-3 w-[15%] border-r-1 border-b-1 border-gray-300">{{ book.genre }}</td>
              <td class="p-3 w-[15%] border-r-1 border-b-1 border-gray-300">
                {{ dayjs.utc(book.created_at).tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm') }}
              </td>
              <td class="text-center p-3 w-[10%] border-b-1 border-gray-300">
                <Icon @click="bookStore.openEditModal(book)" name="material-symbols:edit-document"
                  class="text-blue-600 text-xl cursor-pointer hover:text-blue-400 sm:mr-2" />
                <Icon name="material-symbols:delete" @click="bookStore.openDeleteModal(book)"
                  class="text-red-600 text-xl cursor-pointer hover:text-red-400" />
              </td>
            </tr>
            <tr v-for="i in pageSize - books.length" :key="`empty-${i}`" class="text-left text-sm">
              <td class="p-3.5 border-r-1 border-b-1 border-gray-300 " colspan="7">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- pagination -->
    <div class="flex justify-between items-center space-x-1">
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <div>
        <button @click="currentPage--" :disabled="currentPage <= 1"
          class="rounded-md border border-blue-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-blue-600 hover:text-white hover:bg-blue-800 hover:border-blue-800 focus:text-white focus:bg-blue-800 focus:border-blue-800 active:border-blue-800 active:text-white active:bg-blue-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2">
          < Prev </button>
            <button v-for="(page, i) in paginationRange" :key="i"
              @click="typeof page === 'number' && (currentPage = page)" :disabled="page === '...'" :class="[
                'min-w-9 rounded-md py-2 px-3 text-sm text-center transition-all mx-1',
                page === currentPage
                  ? 'bg-blue-800 text-white shadow-md'
                  : typeof page === 'number'
                    ? 'border border-blue-300 text-blue-600 hover:text-white hover:bg-blue-800 hover:border-blue-800'
                    : 'text-blue-400 cursor-default'
              ]">
              {{ page }}
            </button>
            <button @click="currentPage++" :disabled="currentPage >= totalPages"
              class="min-w-9 rounded-md border border-blue-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-blue-600 hover:text-white hover:bg-blue-800 hover:border-blue-800 focus:text-white focus:bg-blue-800 focus:border-blue-800 active:border-blue-800 active:text-white active:bg-blue-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
              > Next
            </button>
      </div>

    </div>
  </div>
</template>