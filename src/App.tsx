import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


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
type TasksStateType={
    [key:string]:Array<TaskType>
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
    }function changeTaskTitle(taskId: string, newTitle:string, todolistId:string) {
        let tasks=tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle;
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
            {id: todoListId1, title: "What to learn", filter: "all"},
            {id: todoListId2, title: "What to buy", filter: "all"}
        ])
function changeTodoListTitle(id: string, newTitle:string){
 const  todolist=todoLists.find(tl=>tl.id===id)
    if(todolist){
        todolist.title=newTitle
        setTodoLists([...todoLists])
    }
}

    let removeTodoList=(todoListId:string)=> {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }


    let [tasksObj, setTasks] = useState<TasksStateType>({
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

    function addTodoList(title:string){
        let todolist:TodolistType={
            id:v1(),
            filter:'all',
            title:title
        }
        setTodoLists([todolist,...todoLists])
        setTasks({
            ...tasksObj,
            [todolist.id]:[]
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
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
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
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
