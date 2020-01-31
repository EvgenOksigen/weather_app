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
  
        // предположительная точка "посадки" Drag’n’Drop функции 
        let droppableBelow = elemBelow.closest('.finished');
        let droppableBelowBak = elemBelow.closest('.not-finished');
  
  
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) {
            // логика обработки процесса "вылета" из finished (удаляем подсветку)
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) {
            // логика обработки процесса, когда мы "влетаем" в элемент finished
            enterDroppable(currentDroppable);
          }
        } 

      }
  
      document.addEventListener('mousemove', onMouseMove);
  
      dragItem.onmouseup = (e) => {
        //смотрим что "под" курсором и под перетаскиваемым элементом
        dragItem.hidden = true;
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        dragItem.hidden = false;
        //проверка на расположение зоны дропа в нужном месте
        let droppableBelow = elemBelow.closest('.finished');
        let droppableBelowBak = elemBelow.closest('.not-finished')
        
        console.log(elemBelow);
        console.log(droppableBelowBak); // элемент в котором лежит зона дропа (проверка на "родителя" = not-finished? )

  
        if(currentDroppable === elemBelow && currentDroppable === droppableBelow){
          // console.log('курсор находится над ЗЕЛЁНОЙ зоной дропа и мышь была отпущена');
          taskComplete(dragItem.id)
          dragItem.remove();
        }
        if(elemBelow === droppableBelowBak){
          // console.log('курсор находится над крассной зоной дропа и мышь была отпущена');
          taskComplete(dragItem.id)
          dragItem.remove();
        }
        
        // console.log(currentDroppable);// текущая зона для дропа
        // console.log(elemBelow); //элемент который "снизу" под курсором во время отжатия клавиши
        // console.log(droppableBelow);// элемент в котором лежит зона дропа (проверка на "родителя" = finished )
  
          document.removeEventListener('mousemove', onMouseMove);
          dragItem.onmouseup = null;
  
      };
    }
    
    function enterDroppable(elem) {
      elem.style.background = '#afe892';
    }
  
    function leaveDroppable(elem) {
      elem.style.background = '';
    }

    function enterDroppBack(elem) {
      elem.style.background = 'red';
    }

    function leaveDroppBack(elem){
      elem.style.background = ''
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
        {index+1} {task.title} {task.completed.toLocaleString()}
  </span>
    )
}


const mapDispatchToProps = { taskComplete};

export default connect(null, mapDispatchToProps)(TaskItem);