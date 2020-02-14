import React, { useState } from 'react';
import AddTaskListForm from './AddTaskListForm';

const AddTaskList = () => {
  const [taskListForm, setTaskList] = useState(false);
    
  const showAddTaskListFormHandler = () => {
    setTaskList(!taskListForm);
  }
  return ( 
    <div className={taskListForm ? 'task-list' : null}>
      {taskListForm ?
      <AddTaskListForm taskListForm={taskListForm} 
                       setTaskList={setTaskList} />
      : (!taskListForm && <button onClick={showAddTaskListFormHandler} 
        className="add-list btn">
          {<i className="fas fa-plus"></i> || <i>&#215;</i>}
        </button>
      )}
    </div>
  )
}

export default AddTaskList