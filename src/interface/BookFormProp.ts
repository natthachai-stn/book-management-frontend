import type { BookForm } from "~/store/book"

export interface BookFormProp {
    label: string
    name: keyof BookForm
}