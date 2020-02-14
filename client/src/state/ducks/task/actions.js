import * as types from "./types";


export const initTask = ( )=>{
  return{
    type:types.INIT_TASKS,
    
  }
}

export const createTask = (title, id) =>{
  return{
    type: types.ADD_TASK,
    title,
    id
  }
}
export const changeTask = (columnId, id) => {
  return{
    type: types.CHANGE_TASK,
    columnId,
    id
  }
}

export const createNewCollum = (title) =>{
  return{
    type: types.CREATE_NEW_COLLUM,
    title
  }
}

export const dragItemToColumn = (columnId, taskId) => {
  return{
    type: types.DRAG_ITEM_TO_COLUMN,
    columnId, 
    taskId
  }
}

export const swapToOtherColumn = (columnID, taskId ,oldColumn) => {
  
  return{
    type: types.SWAP,
    columnID,
    taskId,
    oldColumn
  }
}