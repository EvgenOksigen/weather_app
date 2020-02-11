import React from "react";
import "./header.css";
import { signOut } from "../../../state/ducks/user/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ signOut }) => {
  return (
    <div className="header-container">
      <nav className="nav-link-container">
        <Link className="nav-link" to="#">
          General
        </Link>
        <Link className="nav-link" to="#">
          Second
        </Link>
        <Link className="nav-link" to="#">
          Third
        </Link>
        <button
          className="log-out btn"
          onClick={() => {
            signOut();
          }}
        >
          LogOut
        </button>
      </nav>
    </div>
  );
};

const mapDispatchToProps = { signOut };

export default connect(null, mapDispatchToProps)(Header);
