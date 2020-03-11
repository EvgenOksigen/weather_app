import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { student_mail } from "../../../helpers/validate";

const Home = ({ user }) => (
  <>
    {user && user.login === "admin" ? (
      <Redirect to="/home/admin" />
    ) : student_mail("@student") ? ( //user.email
      <Redirect to="/home/student" />
    ) : (
      <Redirect to="/home/teacher" />
    )}
  </>
);

const mapStateToProps = ({ user }) => ({ user });

const enhance = compose(withRouter, connect(mapStateToProps, null));

export default enhance(Home);
