import * as types from "./types";
import createReducer from "../../../utils/createReducer"
import initialTasks from '../../../api/tasks'

const initialState = {
  allTasks: []
}

// {id: 0, title: 'Create 1', completed: false },
// {id: 1, title: 'Move 2', completed: false },
// {id: 2, title: 'Done! 3', completed: false }

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
    console.log(s);
    
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
  }
});

export default taskReducer;