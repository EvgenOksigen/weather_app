import React from 'react'


const TaskItem = ({task , index}) =>{
  
  return(
  <li>{index+1} {task.title} {task.completed.toLocaleString()}</li>
    )
}

export default TaskItem