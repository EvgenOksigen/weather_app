import React from "react";
import { withRouter, Route } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import Admin from "../Admin/Admin";
import Student from "../Student/Student";
import Teacher from "../Teacher/Teacher";
import { student_mail } from "../../../helpers/validate";

const Home = ({ location, user }) => (
  <>
    {user && user.login === "admin" ? (
      <Route path="/home" exact render={() => <Admin />} />
    ) : student_mail("@student") ? ( //user.email
      <Route path="/home" exact render={() => <Student />} />
    ) : (
      <Route path="/home" exact render={() => <Teacher />} />
    )}
  </>
);

const mapStateToProps = ({ user }) => ({ user });

const enhance = compose(withRouter, connect(mapStateToProps, null));

export default enhance(Home);
