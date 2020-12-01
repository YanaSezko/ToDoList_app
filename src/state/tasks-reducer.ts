import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { addTodolistAC, RemoveTodolistActionType /*  todoListId1, todoListId2 */ } from './todolists-reducer';


type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | RemoveTodolistActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        case "ADD_TASK": {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId]
            const newTask = { id: action.taskId, title: action.title, isDone: false }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE_TASK_STATUS": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId 
                    ? { ...t, isDone: action.isDone } 
                    :t)
            return ({ ...state })
            /*  const stateCopy = { ...state }
             const tasks = stateCopy[action.todolistId]
             const task = tasks.find(t => t.id === action.taskId)
             if (task) {
                 let newTask={...task,isDone:action.isDone}
                // task.isDone = action.isDone
             }
             return stateCopy */
        }
        case "CHANGE_TASK_TITLE": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId 
                    ? { ...t, title: action.title } 
                    :t)
            return ({ ...state })
           /*  const stateCopy = { ...state }
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }

            return stateCopy */
        }
        case "ADD-TODOLIST": {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD_TASK', title, todolistId, taskId: v1() } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistId } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return { type: 'CHANGE_TASK_TITLE', taskId, title, todolistId } as const
}
