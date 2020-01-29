import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const DefaultRoute = ({ user }) => {
  // debugger
  let path;

  if (user) {
    path = "home";
  } else {
    path = "login";
  }

  return <Redirect to={path} />;
};

const mapStateToProps = ( {user} ) => ({user});

export default connect(mapStateToProps)(DefaultRoute);
