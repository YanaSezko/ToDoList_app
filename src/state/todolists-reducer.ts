import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"
import { todolistAPI } from './../api/todolist-api';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists:Array<TodolistType>
}

type ActionsType = RemoveTodolistActionType 
| AddTodolistActionType 
| ChangeTodolistTitleActionType 
| ChangeTodolistFilterActionType
| SetTodolistsActionType

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId:v1()}
}
export const changeTodolistTitleAC = (id:string,
    title:string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id:id,
    title:title}
}
export const changeTodolistFilterAC = (filter:FilterValuesType, id:string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter, id}
}
export const setTodolistsAC = (todolists:Array<TodolistType>): SetTodolistsActionType => {
    return { type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistsThunk=(dispatch:any)=>{
    todolistAPI.getTodos()
    .then((res)=>{
        //@ts-ignore
        dispatch(setTodolistsAC(res.data))
    })
}

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> =>{
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            },...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
           
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {

            return action.todolists.map(tl=>{
                return{
                    ...tl,
                    filter:'all'
                }
            })
        }
        default:
            return state

    }
}