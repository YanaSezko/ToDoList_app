import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
   title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '2b6e2e12-95e4-4959-af89-fb3a85f352e8'
    }
 }
 
export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    todolistAPI.getTodos()
    .then( (res) => {
        setState(res.data);
    } )
    
       // здесь мы будем делать запрос и ответ закидывать в стейт.
       // который в виде строки будем отображать в div-ке

   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    todolistAPI.createTodo().then( (res) => {
        setState(res.data);
     } )
   
       // здесь мы будем делать запрос и ответ закидывать в стейт.
       // который в виде строки будем отображать в div-ке

   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistId = '6ea8c723-d9af-4e48-ad14-7a665e336469';
    todolistAPI.deleteTodo(todolistId).then( (res) => {
       setState(res.data);
    })    
       // здесь мы будем делать запрос и ответ закидывать в стейт.
       // который в виде строки будем отображать в div-ке
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistId = '6ea8c723-d9af-4e48-ad14-7a665e336469'
       todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
           .then((res) => {
               setState(res.data)
           })

    
       // здесь мы будем делать запрос и ответ закидывать в стейт.
       // который в виде строки будем отображать в div-ке
   }, [])

   return <div> {JSON.stringify(state)}</div>
}