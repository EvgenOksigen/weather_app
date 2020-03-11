import Loadable from "react-loadable";

export default {
  list: Loadable(() => import("./List")),
  name: "Student res",
};
