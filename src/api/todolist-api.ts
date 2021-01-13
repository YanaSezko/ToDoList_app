import axios from 'axios'


type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
 }
 type CommonResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    fieldErroe:Array<string>
    data: T
 }
 
 
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
         // Не забываем заменить API-KEY на собственный
        'API-KEY':'2b6e2e12-95e4-4959-af89-fb3a85f352e8'
    }
 })
 

export const todolistAPI = {

    getTodos() {
        return instance.get<Array<TodolistType>>('todo-lists') 
    },

    updateTodolist(todolistId: string, title: string) {
         return  instance.put<CommonResponseType>(`todo-lists/${todolistId}`, { title: title })
       
    },

    deleteTodo(todolistId:string) {
        return  instance.delete<CommonResponseType>(`todo-lists/${todolistId}`) 
    },

    createTodo(){
        return instance.post<CommonResponseType<{item: TodolistType}>>('todo-lists', {title: "newTodolist"})
    }


}
