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
  [types.ADD_TASK]: (state, { payload }) => {
    const s = JSON.parse(localStorage.getItem('tasks'));
    s.push({
      id : Date.now(),
      title: payload,
      completed: false
    })
    
    localStorage.setItem('tasks', JSON.stringify(s))
    
    return{
      ...state,
      allTasks: s
    }
  },

  [types.INIT_TASKS]: (state) => {
    initialTaskLists.map(item => {
      initialTasks.map(task => {
        if(task.status == item.id){
          item.tasks.push(task);
        }
       })
      //  console.log(item.tasks);
    })


    let storeTask = JSON.parse(localStorage.getItem("tasks-list"));
    console.log(storeTask);
    
    if(storeTask){
      return{
        ...state,
        taskList: storeTask,
        allTasks: storeTask
      }
    }
    else{
      localStorage.setItem('tasks-list', JSON.stringify(initialTaskLists))

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
    let taskTitle = title.match(/\w+/g).toLocaleString().replace(/[\s.,%]/g, '')

    taskListUpdate.push({
        id:id,
        title:taskTitle,
        tasks:[]
      })
      
      localStorage.setItem('tasks-list', JSON.stringify(taskListUpdate))

    console.log(taskListUpdate);

    return{
      // ...state,
      taskList: taskListUpdate,
    }
  }
});

export default taskReducer;