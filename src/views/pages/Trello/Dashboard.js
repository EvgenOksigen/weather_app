import React  from 'react';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import AddTaskList from './AddTaskList';

const Dashboard = ({allTasks}) => {

  return(
    <>
    <div className="board">
      {allTasks.taskList.map((column, index)=> {
        return <TaskList key={column.id} 
                index={index} 
                title={column.title} 
                id={column.id} />
      })}
    </div>
    <AddTaskList />
  </>
  )
}



const mapStateToProps = ({ allTasks })=> ({allTasks});

export default connect(mapStateToProps, null)(Dashboard);