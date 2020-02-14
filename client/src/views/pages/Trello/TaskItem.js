import React from 'react'
import { connect } from 'react-redux';
import { swapToOtherColumn } from '../../../state/ducks/task/actions';

const TaskItem = ({task, column, swapToOtherColumn}) =>{

  const clickHandler = e =>{
    swapToOtherColumn(column, task.id)
  }

  return(
  <div className='task'
        id={task.id}
        column={column}
        onClick={clickHandler}
        >
        {task.title}
  </div>
    )
}

// const mapStateToProps = ({ allTasks: { allTasks, taskList } }) => ({allTasks, taskList});
const mapDispatchToProps = { swapToOtherColumn };

export default connect(null, mapDispatchToProps)(TaskItem);