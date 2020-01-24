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
    findItems: data.map(el=>el.name)
  }
},

  [types.SORT]: (state, {payload}) => {   
    console.log(payload)

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

      state.data.forEach(item => {
      if (item.name.match(regExp)) {
        findItems.push(item.name);
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

    localStorage.setItem('contacts', JSON.stringify(initialContacts));
    
    return{
      ...state,
      findItems:initialContacts.map(item=>item.name),
      data: initialContacts
    }
  }

});

export default startReducer;