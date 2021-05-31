import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer';

let startState: TasksStateType = {}

beforeEach(()=>{
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
     };
})


test('correct task should be deleted from correct array', () => {
   const action = removeTaskAC("2", "todolistId2");
  
   const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
   "todolistId1": [
       { id: "1", title: "CSS", isDone: false },
       { id: "2", title: "JS", isDone: true },
       { id: "3", title: "React", isDone: false }
   ],
   "todolistId2": [
       { id: "1", title: "bread", isDone: false },
       { id: "3", title: "tea", isDone: false }
   ]
});

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", "todolistId2");
 
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"][0].isDone).toBe(false)

})

test('status of specified task should be changed', () => {
    
    const action = changeTaskStatusAC("2", false, "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBeFalsy
    expect(endState["todolistId1"][1].isDone).toBeTruthy
  });

test('title of specified task should be changed', () => {
     
    const action = changeTaskTitleAC("2", "Milkyway", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Milkyway")
    expect(endState["todolistId1"][1].title).toBe("JS")
  });
 
test('new property with new array should be added when new todolist is added', () => {
   
    const action = addTodolistAC("title no matter");
 
    const endState = tasksReducer(startState, action)
 
 
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
 
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
 });
 
test('property with todolistId should be deleted', () => {
   
    const action = removeTodolistAC("todolistId2");
 
    const endState = tasksReducer(startState, action)
 
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
 });

 test('empty arrays should be added when we set todolists', () => {
   
    const action = setTodolistsAC([
        {id:'1',title:'title 1', filter:'all'},
        {id:'2',title:'title 2', filter:"all"}
    ]);
 
    const endState = tasksReducer({}, action)
 
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
 });

 
 
 