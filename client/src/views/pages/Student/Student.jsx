import React from "react";
import Header from "../../layout/Header/Header";
import { connect } from "react-redux";
import { compose } from "redux";

const Student = () => (
  <>
    <Header />
    <div>Student Home Page</div>
  </>
);

const mapStateToProps = ({ user }) => ({ user });

const enhance = compose(connect(mapStateToProps, null));

export default enhance(Student);
