import React from "react";
import "./style.css";

const MainLoader = ({ loading }) => (
  <div className="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default MainLoader;
