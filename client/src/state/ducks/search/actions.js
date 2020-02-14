import * as types from "./types";


export const onInit = (data) => {
  return{
    type : types.INIT_CONTACTS,
    data
  }
};

export const sort = () => ({
  type : types.SORT
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

export const resetContacts = () => ({
  type: types.RESET
});

export const edit = (id, value, field) => {
  return{ 
    type: types.EDIT,
    id,
    value,
    field
  }
};

export const editContact = (id, value, field) => {
  return {
    type : types.EDIT_CONTACT,
    id ,
    value,
    field
  }
}