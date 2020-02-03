import React  from 'react';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import AddTaskList from './AddTaskList';

const Dashboard = ({taskList}) => {

  return(
    <>
    <div className="board">
      {taskList.map((column, index)=> {
        return <TaskList key={column.id} 
                index={index} 
                title={column.title} 
                id={column.id}
                tasks={column.tasks} />
      })}
    </div>
    <AddTaskList />
  </>
  )
}



const mapStateToProps = ({ allTasks: {taskList} })=> ({taskList});

export default connect(mapStateToProps, null)(Dashboard);