import type { BookForm } from "~/store/book"

export interface BookResp {
    data: BookForm[]
    total: number
    page: number
    lastPage: number
}