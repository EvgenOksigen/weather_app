import axios from "axios";
import { setHeader } from "./index";

export const USER_HOST = 'http://localhost:3010'


export const USER_API = `${USER_HOST}/users`;

export default {
  signin: credentials =>
    axios.post(`http://localhost:3010/api/auth/signin`, credentials).then(res => res && res.data),

    me: () => {
    let config = {
      method: "GET",
      baseURL: `http://localhost:3010/api/auth/test`,
      // baseURL : 'http://localhost:3010/api/auth/private',
      headers: setHeader()
    };
    return axios(config).then(res => res && res.data)
  }
  
};
