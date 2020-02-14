import React from "react";
import axios from "axios";
import "./header.css";
import { signOut } from "../../../state/ducks/user/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ signOut }) => {
  const someAPIHandler = () => {
    axios.get("/users").then(resp => {
      console.log(resp.data);
    });
  };

  return (
    <div className="header-container">
      <nav className="nav-link-container">
        <button className="nav-link" onClick={someAPIHandler}>
          <span>A. P. i.</span>
        </button>
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
