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

  const columnEnterHandler = e => {
    console.log( 'you enter on column № ' + id );
  }

  const liEnterHandler = e => {
    console.log(e.target.tagName);
    if(e.target.tagName !== "LI"){
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

      // console.log(oldParent);
      
      root.append(e.target);
      
      e.target.hidden = true;
      let elemBelow = document.elementFromPoint(e.clientX, e.clientY).closest('.task-list-wrapper');
      e.target.hidden = false;

      let droppableBelow = elemBelow.closest('.task-list-wrapper');

      if (!elemBelow) return;

      if(parseInt(droppableBelow.id) !== parseInt(id)){
        droppableBelow.getElementsByTagName('ul')[0].append(oldParent)
        oldParent.hidden=false
        
        
        // changeTask(elemBelow.id, (e.target.children[0].id || e.target.id ))

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
    // debugger
    readyToDragFlag = false

    // e.target.parentNode.className=''
    // oldParent.className=''
    // oldParent.hidden=false
    // oldParent.appendChild(e.target)
    // oldParent.remove()
    
    e.target.hidden = true;
    let elemBelow = document.elementFromPoint(e.clientX, e.clientY).closest('.task-list-wrapper');
    e.target.hidden = false;
    swapToOtherColumn(elemBelow.id, e.target.id, (e.target.attributes['column'].value))
    // e.target.remove()
    // dragItemToColumn(elemBelow.id, (e.target.id ))
    
    

    // debugger
    // dragItemToColumn(droppableBelow.id, e.target.children[0].id)

  }
  

  
  return (
    <div className="task-list-wrapper"
          id={id}
          onMouseEnter={columnEnterHandler}>
      <div className="task-list">
        <>
          <h4 className='p-l-8'>{title}</h4>
        <div id={id}
             className={`${title.toLowerCase().match(/\w+/g).toLocaleString().replace(/[\s.,%]/g, '-')} task-list-container`}>
          <ul>
            {taskItems.map((task, index) => {
              return (
                <div key={index} 
                     index={index+1}
                     >
                  <li 
                      index={index+1} 
                      className='taskItem'
                      key={index}
                      // onMouseEnter={liEnterHandler}
                      // onMouseLeave={liLeaveHandler}
                      // onMouseDown={liMouseDownHandler}
                      // onMouseMove={liMouseMoveHandler}
                      // onMouseUp={liMouseUpHandler}
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