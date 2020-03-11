import React from "react";
import { withRouter, Route } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import Header from "../../layout/Header/Header";
import AdminHome from "../AdminHome/AdminHome";

const Home = ({ location, user }) => (
  <>
    <Header></Header>
    {user && user.login === "admin" ? (
      <>
        <Route path="/home" exact render={() => <AdminHome />} />
      </>
    ) : null}
  </>
);

const mapStateToProps = ({ user }) => ({ user });

const enhance = compose(withRouter, connect(mapStateToProps, null));

export default enhance(Home);
