import axios from "axios";
import type { Book } from "../types/book";

type CreateBookRequest = Omit<Book, "id">;

const api = axios.create({
    baseURL: "https://localhost:7125"
})


//get books
export async function getBooks(){
    const response = await api.get("/api/books");
    return response.data;
}

//create book
export async function createBook(bookData: CreateBookRequest){
    const response = await api.post("/api/books", bookData);
    return response.data;
}

//update book
export async function updateBook(id: number, updatedData: Book){
    const response = await api.put(`/api/books/${id}`, updatedData);
    return response.data;
}

//delete book
export async function deleteBook(id: number){
    const response = await api.delete(`/api/books/${id}`);
    return response.data;
}