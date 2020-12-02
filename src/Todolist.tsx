import React, {useCallback } from "react";
import { FilterValuesType, TaskType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Task } from "./Task";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList: (TodoListId: string) => void
    changeTodoListTitle: (TodoListId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist")

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [])

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

   
    let tasksForTodoList = props.tasks

    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
    }
   
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle} /></h3>
            <IconButton aria-label="delete" onClick={removeTodoList}>
                <Delete />
            </IconButton>
            <AddItemForm addItem={addTask} />
            <div>
                {
                    tasksForTodoList.map(t => <Task
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        task={t}
                        key={t.id}
                        removeTask={props.removeTask}
                        todolistId={props.id} 
                    />)
                }
            </div>
            <div style={{ margin: "10x" }}>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})



