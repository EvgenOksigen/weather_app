import React from 'react'
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import AddTask from './AddTask'
import { dragItemToColumn, swapToOtherColumn } from '../../../state/ducks/task/actions';


const TaskList = ( { taskItems, title, id, dragItemToColumn,swapToOtherColumn } ) => {
  //
  const root = document.getElementById('root');
  let readyToDragFlag = false
  let shiftX
  let shiftY
  let oldParent
  let oldestParent

  const liEnterHandler = e => {
    if(e.target.tagName !== "LI"){
      // debugger
      return;
    }else{
      e.target.className='taskItem active' 
    }
  }

  const liLeaveHandler = e => {
    e.target.className='taskItem'
    readyToDragFlag = false
    e.target.parentNode.style.className=''
  }

  const liMouseDownHandler = e => {
    readyToDragFlag = true

    oldParent = e.target.parentNode;
    oldestParent = e.target.parentNode.parentNode; 
    
    shiftX = e.clientX - e.target.getBoundingClientRect().left;
    shiftY = e.clientY - e.target.getBoundingClientRect().top;

    e.target.ondragstart = function() {
      return false;
    };
  }

  const liMouseMoveHandler = e => {
    if(readyToDragFlag){
      moveAt(e.pageX, e.pageY);
      
      e.target.className = 'taskItem ui droppable'
      
      oldParent.className='placeholder'

      root.append(e.target);
      
      e.target.hidden = true;
      let elemBelow = document.elementFromPoint(e.clientX, e.clientY).closest('.task-list-wrapper');
      e.target.hidden = false;

      let droppableBelow = elemBelow.closest('.task-list-wrapper');

      if (!elemBelow) return;

      if(parseInt(droppableBelow.id) !== id){
        droppableBelow.getElementsByTagName('ul')[0].append(oldParent)
        oldParent.hidden=false
      }
      else{
        oldParent.hidden=false
        droppableBelow.getElementsByTagName('ul')[0].append(oldParent)
      }
      
    }
    
    function moveAt(pageX, pageY){
      e.target.style.left = pageX - shiftX +'px'
      e.target.style.top = pageY - shiftY +'px'
    }

  }

  const liMouseUpHandler = e =>{
    readyToDragFlag = false   
    e.target.hidden = true;
    let elemBelow = document.elementFromPoint(e.clientX, e.clientY).closest('.task-list-wrapper');
    e.target.hidden = false;

    if(parseInt(elemBelow.id) === id){
      oldParent.className='taskItem'
      elemBelow.getElementsByTagName('ul')[0].append(oldestParent)
      oldestParent.append(oldParent)
      oldParent.append(e.target)
      e.target.className = 'task'
      e.target.style.top = ''
      e.target.style.left = ''
      }else{
      swapToOtherColumn(elemBelow.id, e.target.id, (e.target.attributes['column'].value))
      e.target.remove()
      oldParent.remove()
    }

  }
  

  
  return (
    <div className="task-list-wrapper"
          id={id}>
      <div className="task-list">
        <>
          <h4 className='p-l-8'>{title}</h4>
        <div id={id}
             className={`${title.toLowerCase().match(/\w+/g).toLocaleString().replace(/[\s.,%]/g, '-')} task-list-container`}>
          <ul>
            {taskItems.map((task, index) => {
              return (
                <div key={task.id}>
                  <li key={index}
                      index={index+1} 
                      className='taskItem'
                      onMouseEnter={liEnterHandler}
                      onMouseLeave={liLeaveHandler}
                      onMouseDown={liMouseDownHandler}
                      onMouseMove={liMouseMoveHandler}
                      onMouseUp={liMouseUpHandler}
                      >
                        <TaskItem task={task} 
                                  key={task.id} 
                                  index={index} 
                                  column={id}/>
                  </li>
                </div>
              )
            })
            }
          </ul>
          <AddTask idColumn={id}/>
        </div>
        </>
      </div>
    </div>
  )
}

const mapStateToProps = ({ allTasks:{ taskList } })=> ({taskList});

const mapDispatchToProps = { dragItemToColumn, swapToOtherColumn };


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);