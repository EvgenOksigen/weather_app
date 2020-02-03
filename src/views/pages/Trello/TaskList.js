import React from 'react'
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import AddTask from './AddTask'

const TaskList = ( {tasks, title, id } ) => {

  return(
    <div className="task-list">
        <h3>{title}</h3>
      <div id={id}
           className={`${title.toLowerCase()} task-list-container`}>
        <ul>
          {tasks.map((task, index) => {
            if(!task.completed){
              return <li className='taskItem'
              key={index}>
                <TaskItem task={task} key={task.id} index={index} />
              </li>
            }
          })
        }
        </ul>
        <AddTask />
      </div>
    </div>
  )
}


const mapStateToProps = ({ allTasks: {taskList} })=> ({taskList});

export default connect(mapStateToProps, null)(TaskList);