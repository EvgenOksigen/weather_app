import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../../state/ducks/user/actions";
import "./UserLogo.css";

const UserLogo = ({ user, signOut }) => {
  return (
    <div className="user-logo-container">
      <button
        className="log-out btn"
        onClick={() => {
          signOut();
        }}
      >
        LogOut
      </button>
      <label className="user-info">{`${user.email}`}</label>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = { signOut };

export default connect(mapStateToProps, mapDispatchToProps)(UserLogo);
