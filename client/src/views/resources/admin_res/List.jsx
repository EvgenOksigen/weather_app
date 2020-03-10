import React from "react";
import { connect } from "react-redux";

const List = () => {
  return <div>Hi admin res</div>;
};
const mapStateToProps = ({ data, user }) => ({ data, user });

export default connect(mapStateToProps)(List);
