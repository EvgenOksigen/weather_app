import * as types from "./types";
import createReducer from "../../../utils/createReducer";
import initialContacts from "../../../api/contacts";

const initialState = {
  data: [], 
  findItems: [] 
}

const startReducer = createReducer(initialState)({
 //
 [types.INIT_CONTACTS]: (state, {data}) => {
  return{
    ...state,
    data,
    findItems: data.map(el=>el.name).sort()
  }
},

  [types.SORT]: (state) => {   

    let data = state.data.sort((a, b) =>
        a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0)
    return{
      ...state,
      data
    }
  },

  [types.FIND]: (state, {payload}) => {
      let findItems = []

      let regExp = new RegExp(`${payload}`, 'gi')

      state.data.forEach(contact => {
      if (contact.name.match(regExp)) {
        findItems.push(contact.name);
      }
    });

    return{
      ...state,
      findItems
    }
  },

  [types.DELETE_CONTACT]: (state, {id}) => {

    const contactListAfterDelete = [...state.data];

    let indexOfDelete;

    contactListAfterDelete.forEach((contact, index) => {
      if(contact.id === id ){
        indexOfDelete = index;
      }
    })

    contactListAfterDelete.splice(indexOfDelete,1);
    localStorage.setItem("contacts", JSON.stringify(contactListAfterDelete))
    
    return{
      ...state,
      findItems: contactListAfterDelete.map(item=>item.name),
      data: contactListAfterDelete
    }
  },

  [types.RESET] : (state) => {

    localStorage.setItem('contacts', JSON.stringify(initialContacts.sort((a, b) =>
    a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0)));
    
    return{
      ...state,
      findItems:initialContacts.map(item=>item.name).sort(),
      data: initialContacts
    }
  }, 

  [types.EDIT] : (state, {id}) => {
    let contactListToEdit = [...state.data];

    contactListToEdit.forEach(contact => {
      if(contact.id === id){
        contact.edit = !contact.edit
      }
     });

     contactListToEdit.sort((a, b) => a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0);

     localStorage.setItem("contacts", JSON.stringify(contactListToEdit))

    return{
      ...state,
      data : contactListToEdit,
      findItems : contactListToEdit.map(el=>el.name).sort()
    }
  },

  [types.EDIT_CONTACT] : (state, {id, value, field}) => {

    let onlyNumber = new RegExp('(\\d){8,11}', 'g')

    let data = [];
    
    const contactListAfterEdit = [...state.data];

    if (field === 'n'){
      contactListAfterEdit.forEach(contact => {
        if(contact.id === id){  
          contact.name = value
        }});
    }else if (field === 'p'){
      contactListAfterEdit.forEach(contact => {
        if(contact.id === id){
          if (value.match(onlyNumber)){
            let v = value.match(onlyNumber) || 0
            contact.phoneNumber = v.toLocaleString().replace(/[\s.,%]/g, ''); 
          }
          debugger
          return contact.phoneNumber
        }});
    }
    data = contactListAfterEdit;
    
   localStorage.setItem("contacts", JSON.stringify(data));

    return{
      ...state,
      // data : contactListAfterEdit
    }
  }


});

export default startReducer;