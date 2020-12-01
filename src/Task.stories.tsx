import React from 'react'

import {action} from '@storybook/addon-actions'
import { Task } from './Task'

export default {
  title: 'Task Component',
  component: Task
}

const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Status removed")


export const TaskBaseExample = () => {
  return <>
            <Task
                        changeTaskStatus={changeTaskStatusCallback}
                        changeTaskTitle={changeTaskTitleCallback}
                        task={{id:'1',isDone:true,title:'CSS'}}
                        removeTask={removeTaskCallback}
                        todolistId={"todolistId1"} 
                    />
              <Task
                        changeTaskStatus={changeTaskStatusCallback}
                        changeTaskTitle={changeTaskTitleCallback}
                        task={{id:'2',isDone:false,title:'JS'}}
                        removeTask={removeTaskCallback}
                        todolistId={"todolistId2"} 
                    />
  </>
}
