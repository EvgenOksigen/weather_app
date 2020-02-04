import React from 'react'
import { connect } from 'react-redux';
import { dragItemToColumn } from '../../../state/ducks/task/actions';

const TaskItem = ({task, column, allTasks, taskList, dragItemToColumn}) =>{
  const dragNDrop = (e) => {
    const dragItem = e.target.parentNode;
    
    dragItem.ondragstart = function() {
      return false;
    };
    
    dragItem.onmousedown = e => {
      const currentDroppableId = dragItem.firstChild.attributes['column'].value;
      
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
        dragItem.style.transform = 'rotate(3deg)'

        dragItem.hidden = true;
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        dragItem.hidden = false;
  
        if (!elemBelow) return;
        
      }
  
      document.addEventListener('mousemove', onMouseMove);
  
      dragItem.onmouseup = (e) => {
        //
        dragItem.hidden = true;
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        dragItem.hidden = false;
        
        // let droppableBelow = elemBelow.closest(`.${dragItem.id}`);

        if (elemBelow.id === currentDroppableId) {
          if(elemBelow.className === 'task-list-wrapper') {
            dragItem.style.position = ''
            dragItem.style.left = ''
            dragItem.style.top = ''
            dragItem.style.zIndex = '';
            dragItem.style.transform = ''
            elemBelow.children[0].children[1].children[0].append(dragItem)
          }
        } else { 
          if(elemBelow.id !== currentDroppableId){
            
            console.log(dragItem.firstChild.id);

            let targetTask

            allTasks.map(task=>{ 
              if(task.id === parseInt(dragItem.firstChild.id)){
                task.status = parseInt(elemBelow.id)
                targetTask = task                
              }
            });
            console.log(targetTask);

            taskList[elemBelow.id].tasks.push(targetTask)
            
            console.log(taskList[elemBelow.id].tasks);

            // dragItemToColumn(elemBelow.id, dragItem.firstChild.id)
          }
        }

  
          document.removeEventListener('mousemove', onMouseMove);
          dragItem.onmouseup = null;
  
      };
    }
    
    // function enterDroppable(elem) {
    //   elem.style.background = '#afe892';
    // }
  
    // function enterDroppableBack(elem) {
    //   elem.style.background = 'pink';
    // }
    
    // function leaveDroppable(elem) {
    //   elem.style.background = '';
    // }

  }

  
  const style = {
    span:{
      display: 'block',
      maxWidth:'250px',
      width:'100%',
    }
  }
  
  return(
  <span className='task-item'
      style={style.span}
      onMouseOver={dragNDrop}
      id={task.id}
      column={column}
      >
        {task.title}
  </span>
    )
}

const mapStateToProps = ({ allTasks: { allTasks, taskList } }) => ({allTasks, taskList});
const mapDispatchToProps = { dragItemToColumn };

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);