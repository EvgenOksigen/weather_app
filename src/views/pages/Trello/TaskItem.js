import React from 'react'
import { connect } from 'react-redux';
import {taskComplete} from '../../../state/ducks/task/actions'

const TaskItem = ({task, index, taskComplete}) =>{
  const dragNDrop = (e) => {
    const dragItem = e.target;
    
    dragItem.ondragstart = function() {
      return false;
    };
    let currentDroppable = null;
    
    dragItem.onmousedown = e => {
      dragItem.style.position = 'absolute'
      dragItem.style.zIndex = 1000;
      
      let shiftX = e.clientX - dragItem.getBoundingClientRect().left;
      let shiftY = e.clientY - dragItem.getBoundingClientRect().top;
      
      document.body.append(dragItem);

      moveAt(e.pageX, e.pageY);
      
      function moveAt(pageX, pageY){
        dragItem.style.left = pageX - shiftX +'px'
        dragItem.style.top = pageY - shiftY +'px'
      }
  
      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
        console.log(currentDroppable);
  
        dragItem.hidden = true;
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        dragItem.hidden = false;
  
        if (!elemBelow) return;
  
        let droppableBelow = elemBelow.closest('.finished');
  
  
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) {
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) {
            enterDroppable(currentDroppable);
          }
        } 
       

      }
  
      document.addEventListener('mousemove', onMouseMove);
  
      dragItem.onmouseup = (e) => {
        dragItem.hidden = true;
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        dragItem.hidden = false;
        let droppableBelow = elemBelow.closest('.finished');
        let droppableBelowBak = elemBelow.closest('.not-finished')
        
        if(currentDroppable === elemBelow && currentDroppable === droppableBelow){
          taskComplete(dragItem.id)
          dragItem.remove();
        }
        if(elemBelow === droppableBelowBak){
          taskComplete(dragItem.id)
          dragItem.remove();
        }
  
          document.removeEventListener('mousemove', onMouseMove);
          dragItem.onmouseup = null;
  
      };
    }
    
    function enterDroppable(elem) {
      elem.style.background = '#afe892';
    }
  
    function enterDroppableBack(elem) {
      elem.style.background = 'pink';
    }
    
    function leaveDroppable(elem) {
      elem.style.background = '';
    }

  }

  
  const style = {
    span:{
      display: 'block',
      width:'200px',
      padding:0 ,
      listStyleType:'none',
      textAlign:'left'
    }
  }
  
  return(
  <span className='taskItem'
      style={style.span}
      onMouseOver={dragNDrop}
      id={task.id}>
        {task.title}
  </span>
    )
}


const mapDispatchToProps = { taskComplete};

export default connect(null, mapDispatchToProps)(TaskItem);