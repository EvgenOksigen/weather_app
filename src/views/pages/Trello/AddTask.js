import React, {useState}  from 'react'
import { connect } from 'react-redux';
import { createTask } from '../../../state/ducks/task/actions';

 function useInputValue (defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  return{
    bind:{
      value,
      onChange: event=> setValue(event.target.value)
    },
    clear: ()=> setValue(''),
    value: ()=> value
  }
 }

 const AddTask = ({createTask}) =>  {

   const input = useInputValue('')

   function formSubmit(e){
     e.preventDefault();
      createTask(input.value())
      input.clear()
   }

  return (
    <div className="card-composer">

      <label className="composer-title">Create a task: </label>

      <form onSubmit={formSubmit}>
      
        <input {...input.bind}/>
      
        <button type="submit"> Add </button>
      
      </form>
    </div>
    )
 }

// const mapStateToProps = ({ allTasks: { allTasks } }) => ({ allTasks });
 
const mapDispatchToProps = { createTask };

export default connect(null, mapDispatchToProps)(AddTask);