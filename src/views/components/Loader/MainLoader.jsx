import React from "react";

import logo from "../../images/logo.svg";

import "./MainLoader.less";

const MainLoader = ({ loading }) => (
  <div className={`main-loader ${loading ? "active" : ""}`}>
    <img src={logo} alt="mvaua" />

    <div className="line-loading"></div>
  </div>
);

export default MainLoader;
