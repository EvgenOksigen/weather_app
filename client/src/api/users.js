import axios from "axios";
import { setHeader } from "./index";

export const USER_HOST = 'http://localhost:3010'


export const USER_API = `${USER_HOST}/api/auth`;

export default {
  signin: credentials =>
    axios.post(`${USER_API}/signin`, credentials).then(res => res && res.data),

    me: () => {
    let config = {
      method: "GET",
      baseURL: `${USER_API}/me`,
      headers: setHeader()
    };
    return axios(config).then(res => res && res.data)
  }
  
};
