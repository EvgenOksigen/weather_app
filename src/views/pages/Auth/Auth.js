import React from "react";

// import LogIn from "../../forms/LogIn/LogIn";
import './Auth'
import LoginForm from "../../forms/LogIn/Log";

const Auth = () => (
  <div className="background">
    <div className="wrap-login-form">
      {/* <LogIn /> */}
      <LoginForm/>
    </div>
  </div>
);

export default Auth;
