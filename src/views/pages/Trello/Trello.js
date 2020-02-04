import React, { useState, useEffect } from 'react'
import './trello.css'
import Loader from './Loader'
import { connect } from 'react-redux'
import { initTask } from '../../../state/ducks/task/actions'
import Dashboard from './Dashboard'

const Trello = ({initTask}) => {
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      initTask();
      setLoading(false)
    }
    , 2700);
    return () => clearTimeout(timer);
  }, [initTask]);

  return (
    <div className="dashboard-container">
      {loading ?  <Loader/> : (
        <>
          <h1 className='p-l-8'>Dashboard</h1>
          <div className="dashboard-content">
            <Dashboard />
          </div>
        </>
      )}
    </div>
  )
}



const mapDispatchToProps = { initTask };

export default connect(null, mapDispatchToProps)(Trello);