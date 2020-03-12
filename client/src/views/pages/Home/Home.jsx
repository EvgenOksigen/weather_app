import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

const Home = ({ user }) => (
  <>
    {user && user.role === 0 ? (
      <Redirect to="/home/admin" />
    ) : user.role === 2 ? ( //user.email
      <Redirect to="/home/student" />
    ) : (
      <Redirect to="/home/teacher" />
    )}
  </>
);

const mapStateToProps = ({ user }) => ({ user });

const enhance = compose(withRouter, connect(mapStateToProps, null));

export default enhance(Home);
