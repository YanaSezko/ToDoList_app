import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk';
import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
//@ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store