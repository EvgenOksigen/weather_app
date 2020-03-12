import React from "react";
import "./header.css";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import UserLogo from "../../components/UserLogo/UserLogo";
import { compose } from "redux";
import { isStudent, isKhai_mail, isAdmin } from "../../../helpers/validate";

const Header = ({ user, location }) => {
  return (
    <div className="header-container">
      <UserLogo />

      <nav>
        <div className="nav-link-container">
          {}
          {(isKhai_mail(user.email) && isStudent(user.email) && (
            <>
              <NavLink className="nav-link" to={`${location.pathname}/journal`}>
                Journal
              </NavLink>
              <NavLink className="nav-link" to={`${location.pathname}/test`}>
                Tests
              </NavLink>
            </>
          )) ||
            (isKhai_mail(user.email) && isAdmin(user.email) && (
              //Admin
              <>
                <NavLink
                  className="nav-link"
                  to={`${location.pathname}/journal`}
                >
                  Journal
                </NavLink>
                <NavLink className="nav-link" to={`${location.pathname}/test`}>
                  Tests
                </NavLink>
              </>
            ))}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const enhance = compose(connect(mapStateToProps, null), withRouter);

export default enhance(Header);
