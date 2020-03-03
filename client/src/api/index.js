import axios from 'axios'

import contacts from './contacts'
import users from './users'
import tasks from './tasks';

import store from '../state/store'

export const CanselToken = axios.CancelToken;

export const setHeader = () => {
  const state = store.getState();
  const token =
    (state.user && state.user.token) || localStorage.getItem("token");

  return {
    Accept: "application/json",
    Authorization: token,
  };
};

export default {
  contacts,
  users,
  tasks
};