import React, { useState, useEffect } from 'react'
import './trello.css'
import Loader from './Loader'
import { connect } from 'react-redux'
import { initTask } from '../../../state/ducks/task/actions'
import Dashboard from './Dashboard'
import Header from '../../layout/Header/Header'

const Trello = ({initTask}) => {
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      initTask();
      setLoading(false)
    }
    , 0); //2700
    return () => clearTimeout(timer);
  }, [initTask]);

  return (
    <div className="dashboard-container">
      {loading ?  <Loader/> : (
        <>
          <Header />
          <div>
            <h1 className='p-l-8'>Simple dashboard</h1>
            <div className="dashboard-content">
              <Dashboard />
            </div>
          </div>
        </>
      )}
    </div>
  )
}



const mapDispatchToProps = { initTask };

export default connect(null, mapDispatchToProps)(Trello);