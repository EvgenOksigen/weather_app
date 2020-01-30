import * as types from "./types";


export const initTask = ()=>{
  return{
    type:types.INIT_TASKS
  }
}

export const createTask = (payload) =>{
  return{
    type: types.ADD_TASK,
    payload
  }
}