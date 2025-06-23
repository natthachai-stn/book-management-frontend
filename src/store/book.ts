import { defineStore } from 'pinia'

export type BookForm = {
  id?: string
  title: string
  author: string
  published_year: string
  genre: string
  created_at?: string
}

export const useBookStore = defineStore('book', () => {
  const nuxtApp = useNuxtApp();
  const books = ref<BookForm[]>([])
  const isLoading = ref(false)

  const showModal = ref(false)
  const showDeleteModal = ref(false)
  const isEditMode = ref(false)
  const fetchKey = ref('')

  const formState = ref<BookForm>({
    title: '',
    author: '',
    published_year: '',
    genre: ''
  })

  const openAddModal = () => {
    showModal.value = true
  }

  const openDeleteModal = (book: BookForm) => {
    showDeleteModal.value = true
    formState.value = {
      id: book.id,
      title: book.title,
      author: book.author,
      published_year: String(book.published_year ?? ''),
      genre: book.genre ?? ''
    }
  }

  const openEditModal = (book: BookForm) => {
    formState.value = {
      id: book.id,
      title: book.title,
      author: book.author,
      published_year: String(book.published_year ?? ''),
      genre: book.genre ?? ''
    }
    isEditMode.value = true
    showModal.value = true
  }

  const saveBook = async () => {
    const payload = {
      ...formState.value,
      published_year: parseInt(formState.value.published_year || '0'),
    }

    if (isEditMode.value) {
      await nuxtApp.$axios.put(`/book/${payload.id}`, payload)
    } else {
      await nuxtApp.$axios.post('/book', payload)
    }

    closeModal()
  }


  const deleteBook = async () => {
    await nuxtApp.$axios.delete(`/book/${formState.value.id}`)
    closeModal()
  }

  const closeModal = () => {
    showDeleteModal.value = false
    showModal.value = false
    isEditMode.value = false
    formState.value = {
      title: '',
      author: '',
      published_year: '',
      genre: ''
    }
    fetchKey.value = new Date().toISOString()
  }

  return {
    books,
    formState,
    showModal,
    isEditMode,
    openAddModal,
    openEditModal,
    saveBook,
    closeModal,
    isLoading,
    deleteBook,
    showDeleteModal,
    openDeleteModal,
    fetchKey
  }
})
