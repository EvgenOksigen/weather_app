import * as types from "./types";
import createReducer from "../../../utils/createReducer"
import initialTasks from '../../../api/tasks'

const initialState = {
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
    let s = JSON.parse(localStorage.getItem("tasks"));
    // console.log(s);
    if(s){
      return{
        ...state,
        allTasks: s
      }
    }
    else{
      localStorage.setItem('tasks', JSON.stringify(initialTasks))
      return{
        ...state,
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
  }
});

export default taskReducer;