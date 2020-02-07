import React, { useEffect }  from 'react';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import AddTaskList from './AddTaskList';

const Dashboard = ({allTasks}) => {
  useEffect(()=>{
    localStorage.setItem('tasks-list', JSON.stringify(allTasks.taskList));
    localStorage.setItem('tasks', JSON.stringify(allTasks.allTasks))
  }, [allTasks]);

  return(
    <>
    <div className="board">
      {allTasks.taskList.map((column)=> {
        return <TaskList title={column.title}
                         id={column.id}
                         key={column.id}
                         taskItems={column.tasks}/>
      })}
    </div>
    <AddTaskList />
  </>
  )
}



const mapStateToProps = ({ allTasks })=> ({allTasks });

export default connect(mapStateToProps, null)(Dashboard);