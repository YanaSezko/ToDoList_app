import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    function removeTask(id: string,todolistId:string) {
        let tasks=tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId]=filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId:string) {
        let tasks=tasksObj[todolistId]
        let nextTask = {id: v1(), title: title, isDone: false};
        let newTasks = [nextTask, ...tasks];
        tasksObj[todolistId]=newTasks
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId:string) {
        let tasks=tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v1()
    let  todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
            {id: todoListId1, title: "What to learn", filter: "active"},
            {id: todoListId2, title: "What to buy", filter: "completed"}
        ])

    let removeTodoList=(todoListId:string)=> {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }
    let [tasksObj, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
        ]

    })

    return (
        <div className="App">
            {
                todoLists.map((tl) => {

                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

export default App;
// function changeStatus (taskID: string, isDone: boolean,todolistId:string) {
//     const todoList=todoList.map(task=>{
//
//         if(task.id === taskID){
//             return {...task, isDone: isDone}
//         }
//         return task
//     })
// tasks[todoListID] = newTodoList
// setTasks({...tasks})
// }
