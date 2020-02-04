import React from 'react'
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import AddTask from './AddTask'

const TaskList = ( {title, id, allTasks } ) => {


  const style = {
    li:{
      display: 'block',
      maxWidth:'250px',
      width:'100%',
      padding:0 ,
      listStyleType:'none',
    }
  }
  
  return (
    <div id={id} className="task-list-wrapper"
          >
      <div className="task-list">
          <h4 className='p-l-8'>{title}</h4>
        <div id={id}
             className={`${title.toLowerCase().match(/\w+/g).toLocaleString().replace(/[\s.,%]/g, '-')} task-list-container`}>
          <ul>
            {allTasks.allTasks.map((task, index) => {
              if(task.status === id){
                return (
                <li style={style.li}
                    index={index} 
                    className='taskItem'
                    key={index}>
                      <TaskItem task={task} 
                                key={task.id} 
                                index={index} 
                                column={id} />
                </li>
                )
              }
            })
          }
          </ul>
          <AddTask idColumn={id}/>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = ({ allTasks })=> ({allTasks});

export default connect(mapStateToProps, null)(TaskList);