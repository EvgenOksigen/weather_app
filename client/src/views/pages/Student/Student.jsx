import React from "react";
import Header from "../../layout/Header/Header";
import { connect } from "react-redux";
import { compose } from "redux";
import Journal from "../../components/Journal/Journal";

const Student = () => (
  <>
    <Header />
    Student
    <Journal />
  </>
);

const mapStateToProps = ({ user }) => ({ user });

const enhance = compose(connect(mapStateToProps, null));

export default enhance(Student);
