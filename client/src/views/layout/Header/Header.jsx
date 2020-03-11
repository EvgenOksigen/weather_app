import React from "react";
import "./header.css";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import UserLogo from "../../components/UserLogo/UserLogo";
import { compose } from "redux";

const Header = ({ user, resources, location }) => {
  return (
    <div className="header-container">
      <UserLogo />
      <nav>
        <div className="nav-link-container">
          {user && user.login === "admin" && (
            <>
              <NavLink className="nav-link" to="#">
                Study Programm
              </NavLink>
              <NavLink className="nav-link" to="#">
                Add User
              </NavLink>
              <NavLink className="nav-link" to="#">
                Journal
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

// const mapDispatchToProps = {};

const enhance = compose(connect(mapStateToProps, null), withRouter);

export default enhance(Header);
