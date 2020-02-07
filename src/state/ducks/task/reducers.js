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
  [types.INIT_TASKS]: (state) => {

    let storeTaskList = JSON.parse(localStorage.getItem("tasks-list"));
    let storeTask = JSON.parse(localStorage.getItem("tasks"));
    
    if(!storeTask || !storeTaskList){
      
      initialTaskLists.map(item => {
        initialTasks.map(task => {
          if(task.status === item.id){
            item.tasks.push(task);
          }
        })
      }) 

      return{
        ...state,
        taskList:initialTaskLists ,
        allTasks:initialTasks
      }
    }
    else{
      return{
        ...state,
        taskList: storeTaskList,
        allTasks: storeTask
      }
      
    }
  },
  
  [types.ADD_TASK]: (state, { title, id }) => {
    
    const allTasks = [...state.allTasks];
    const taskList = [...state.taskList];
    if (title!== undefined && title !=='')
    {
      allTasks.push({
        id : state.allTasks.length,
        title: title,
        status: id
      })
  
      taskList.map(item => {
        if(item.id === id){
          item.tasks.push({
            id : state.allTasks.length,
            title: title,
            status: id
          })
        }
      })
    }

    return{
      ...state,
      taskList : taskList,
      allTasks : allTasks
    }
  },

  [types.CREATE_NEW_COLLUM] : (state, {title}) => {
    
    const taskListUpdate = [...state.taskList]
    let id = state.taskList.length
    let taskTitle = title

    taskListUpdate.push({
        id:id,
        title:taskTitle,
        tasks:[]
      })
    return{
      ...state,
      taskList: taskListUpdate,
    }
  },

  [types.CHANGE_TASK] : (state , {columnId, id}) =>{
    const allTasks = [...state.allTasks];
    const taskList = [...state.taskList];
    
    let targetTask

    allTasks.map(task => { 
      if(task.id === parseInt(id)){
        targetTask = task
        task.status = parseInt(columnId)        
      }
    });
    


    taskList.map(item => {
      if (item.id === parseInt(columnId)){
        item.tasks.push(targetTask)
      }
    })
    taskList.map(item => {
      if (item.id !== parseInt(columnId)){
        item.tasks = item.tasks.filter(task  => task.id !== targetTask.id)
      }
    })
    
    console.log(taskList);
    return{
      ...state,
      allTasks:allTasks,
      taskList:taskList
    }
  },

  [types.DRAG_ITEM_TO_COLUMN] : (state, {columnId, taskId}) => {
  
    let allTasks = [...state.allTasks]
    let taskList = [...state.taskList]
    let targetTaskList
    let targetTask

    console.log('before', allTasks);

    allTasks.map(task => {
      if(task.id === parseInt(taskId)){
        task.status = parseInt(columnId)
        return targetTask = task
      }
    })
    console.log('targetTask', targetTask);
    
    taskList.map(item=>{
      if(item.id === parseInt(columnId)){
        return targetTaskList = item.tasks
      }
    })
    console.log('targetTaskList', targetTaskList);
    
    let filterList = targetTaskList.filter(task => task.id !== parseInt(taskId))
    
    taskList.map(item=>{
      if(item.id === parseInt(columnId)){
        return item.tasks = filterList
      }else{
        item.tasks = []
        allTasks.map(task=>{
          if(task.status === item.id){
            item.tasks.push(task)
          }
        })
      }
    })
    console.log('taskList UPD',taskList);
    

    console.log('after',allTasks);
    console.log('filter', filterList);
    
    
    return{
      ...state,
      allTasks
    }
  },

  [types.SWAP] : (state, {columnID, taskId, oldColumn}) =>{
  
    let allTasks = [...state.allTasks]
    let taskList = [...state.taskList]
    let targetTaskList
    let targetTask
    let filterList

    console.log('before', allTasks);

    allTasks.map(task => {
      if(task.id === parseInt(taskId)){
        task.status = parseInt(columnID)
        targetTask = task
      }
    })
    console.log('targetTask', targetTask);
    
    taskList.map(item=>{
      if(item.id === parseInt(oldColumn)){
        targetTaskList = item.tasks

      }
      // debugger
      return targetTaskList
    })
    console.log('targetTaskList', targetTaskList);
    // debugger
    filterList = targetTaskList.filter(task => task.id !== parseInt(taskId))
    
    taskList.map(item=>{
      if(item.id === parseInt(oldColumn)){
        return item.tasks = filterList
      }else{
        item.tasks = []
        allTasks.map(task=>{
          if(task.status === item.id){
            item.tasks.push(task)
          }
        })
      }
    })
    console.log('taskList UPD',taskList);
    

    console.log('after',allTasks);
    console.log('filter', filterList);
    
    
    return{
      ...state,
      allTasks,
      taskList
    }
  },
/* 
  [types.SWAP] : (state, {columnID, taskId}) =>{
  
    let allTasks = [...state.allTasks]
    let taskList = [...state.taskList]
    let targetTaskList
    let targetTask
    let filterList

    console.log('before', allTasks);

    allTasks.map(task => {
      if(task.id === parseInt(taskId)){
        task.status = parseInt(columnID + 1)
        targetTask = task
      }
    })
    console.log('targetTask', targetTask);
    
    taskList.map(item=>{
      if(item.id === parseInt(columnID)){
        targetTaskList = item.tasks

      }
      // debugger
      return targetTaskList
    })
    console.log('targetTaskList', targetTaskList);
    // debugger
    filterList = targetTaskList.filter(task => task.id !== parseInt(taskId))
    
    taskList.map(item=>{
      if(item.id === parseInt(columnID)){
        return item.tasks = filterList
      }else{
        item.tasks = []
        allTasks.map(task=>{
          if(task.status === item.id){
            item.tasks.push(task)
          }
        })
      }
    })
    console.log('taskList UPD',taskList);
    

    console.log('after',allTasks);
    console.log('filter', filterList);
    
    
    return{
      ...state,
      allTasks,
      taskList
    }
  } */
});

export default taskReducer;