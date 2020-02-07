import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createNewCollum } from '../../../state/ducks/task/actions';

const AddTaskListForm = ({setTaskList, createNewCollum }) => {

  const [value, setValue] = useState('')
  
  const inputHandler = e => {
    setValue(e.target.value)
  }

  function formSubmit(e) {
    e.preventDefault();
    setTaskList(false)
    
    createNewCollum(value);
  }

  return(
    <>
      <span className="add-form-title">Input name</span>
      <div className="add-task-list-form task-list-container">

        <form onSubmit={formSubmit}>

          <input className="column-title" onChange={inputHandler} />

          <div className="form-footer">

            <button className="add-column-btn" 
                    type="submit" 
                    >Add
          </button>

            <button className="close" 
                    type="button" 
                    onClick={()=>{setTaskList(false)}}>
              &times;
            </button>

          </div>
        </form>
      </div>
    </>
  )
}

// const mapStateToProps = ({allTasks:{taskList}}) => ({taskList});

const mapDispatchToProps = {createNewCollum};

export default connect(null, mapDispatchToProps)(AddTaskListForm);