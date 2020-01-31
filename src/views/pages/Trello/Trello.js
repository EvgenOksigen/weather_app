import React, { useState, useEffect } from 'react'
import TaskList from './TaskList'
import './trello.css'
import AddTask from './AddTask'
import Loader from './Loader'
import { connect } from 'react-redux'
import { initTask } from '../../../state/ducks/task/actions'



const Trello = ({initTask}) => {
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      initTask();
      setLoading(false)
    }
    , 2800);
    return () => clearTimeout(timer);
  }, [initTask]);

  return (
    <div className="tasks-dashboard">
      {loading ?  <Loader/> : (
        <>
          <h3> Hello in TrELLO! </h3>
          <p className="">Create a task: </p>
          <AddTask/>
          <TaskList/>
        </>
      )}
    </div>
  )
}



const mapDispatchToProps = { initTask };

export default connect(null, mapDispatchToProps)(Trello);