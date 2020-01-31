import React from 'react'
import TaskItem from './TaskItem';
import { connect } from 'react-redux';

const TaskList = ( {allTasks} ) => {
  
  return(
      <>
      <label>Task list:</label>

      <div className='taskList taskListHeader'>
        <label>Unfinished tasks</label>
        <label>Finished tasks</label>
      </div>
      
      <div className="taskList">
        
        <div className='not-finished'>
        <ul>
          {allTasks.map((task, index) => {
            if(!task.completed){
             return <li className='taskItem'
                        key={index}>
                <TaskItem task={task} key={task.id} index={index} />
              </li>
            }
          })
          }
        </ul>
        </div>
        <div className='finished'>
          <ul>
            {allTasks.map((task, index) => {
              if(task.completed){
                return <li className='taskItem'
                           key={index}>
                  <TaskItem task={task} key={task.id} index={index} />
                  </li>
              }
            })
            }
          </ul>
        </div>
    </div>
    </>
  )
}


const mapStateToProps = ({ allTasks: {allTasks} })=> ({allTasks});

export default connect(mapStateToProps, null)(TaskList);