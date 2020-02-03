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

export const taskComplete = (id) => {
  
  return {
    type: types.COMPLETE_TASK,
    id
  }
}

export const createNewCollum = (title) =>{
  
  return{
    type: types.CREATE_NEW_COLLUM,
    title
  }
}