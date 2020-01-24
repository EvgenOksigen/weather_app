import * as types from "./types";


export const onInit = (data) => {
  
  return{
    type : types.INIT_CONTACTS,
    data
  }
};

export const sort = (arr) => ({
  type : types.SORT,
  payload: arr
});


export const find = (payload) => ({
  type: types.FIND,
  payload
})

export const deleteContact = (id) => {

  return {
    type: types.DELETE_CONTACT,
    id
  }
};

export const resetContacts = ()=> ({
  type: types.RESET
});