import * as types from "./types";
import createReducer from "../../../utils/createReducer"
import initialTasks from '../../../api/tasks'
import initialTaskLists from "../../../api/taskList";

const initialState = {
  taskList:[],
  allTasks: []
}

const taskReducer = createReducer(initialState)({
  //
  [types.ADD_TASK]: (state, { title, id }) => {
    const storeTasks = JSON.parse(localStorage.getItem('tasks'));
    const columns = state.taskList;

    columns.map(item => {
      if(item.id === id){
        item.tasks.push({
          id : state.allTasks.length,
          title: title,
          status: id
        })
      }
    })

    storeTasks.push({
      id : state.allTasks.length,
      title: title,
      status: id
    })

    localStorage.setItem('tasks', JSON.stringify(storeTasks))
    
    return{
      ...state,
      taskList: columns,
      allTasks: storeTasks
    }
  },

  [types.INIT_TASKS]: (state) => {
    initialTaskLists.map(item => {
      initialTasks.map(task => {
        if(task.status === item.id){
          item.tasks.push(task);
        }
       })
      //  console.log(item.tasks);
    })


    let storeTaskList = JSON.parse(localStorage.getItem("tasks-list"));
    let storeTask = JSON.parse(localStorage.getItem("tasks"));
    
    if(storeTask){
      return{
        ...state,
        taskList: storeTaskList,
        allTasks: storeTask
      }
    }
    else{
      localStorage.setItem('tasks-list', JSON.stringify(initialTaskLists))
      localStorage.setItem('tasks', JSON.stringify(initialTasks))

      return{
        ...state,
        taskList: initialTaskLists,
        allTasks: initialTasks
      }
    }
  },

  [types.COMPLETE_TASK] : (state, {id}) => {

    let allTasksUpdate = [...state.allTasks];

    allTasksUpdate.map(task => {
      if(task.id === parseInt(id) ){ //&& task.completed===false
        task.completed = !task.completed
      }
    });

    localStorage.setItem("tasks", JSON.stringify(allTasksUpdate))

    return{
      allTasks: allTasksUpdate
    }
  },

  [types.CREATE_NEW_COLLUM] : (state, {title}) => {
    
    const taskListUpdate = state.taskList;
    let id = state.taskList.length
    let taskTitle = title

    taskListUpdate.push({
        id:id,
        title:taskTitle,
        tasks:[]
      })
      
      localStorage.setItem('tasks-list', JSON.stringify(taskListUpdate))

    return{
      ...state,
      taskList: taskListUpdate,
    }
  },

  [types.DRAG_ITEM_TO_COLUMN] : (state, {columnId, taskId}) => {
    const taskListUPD = state.taskList;
    const allTasksUPD = state.allTasks
    let targetTask

    allTasksUPD.map(task=>{ 
      if(task.id === parseInt(taskId)){
        targetTask = task
        task.status = parseInt(columnId)        
      }
    });

    taskListUPD[columnId].tasks.push(targetTask)

    console.log(taskListUPD);
    

    // taskListUPD[columnId].tasks.push([...state.allTasks][taskId])

    localStorage.setItem('tasks-list', JSON.stringify(taskListUPD))

    return{
      ...state,
      taskList: taskListUPD,
      allTasks: allTasksUPD
    }
  } 
});

export default taskReducer;