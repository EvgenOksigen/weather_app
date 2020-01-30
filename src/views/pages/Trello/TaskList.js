import React from 'react'
import TaskItem from './TaskItem';
import { connect } from 'react-redux';

const TaskList = ( {allTasks}) => {
console.log(allTasks);

  return(
    <div className="taskList">
      <ul>
        {allTasks.map((task, index) => {
          return <TaskItem task={task} key={task.id} index={index} />
        })}
      </ul>
    </div>
  )
}


const mapStateToProps = ({ allTasks: { allTasks } }) => ({ allTasks });

export default connect(mapStateToProps, null)(TaskList);