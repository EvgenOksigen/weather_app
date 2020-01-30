import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const GuestRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!user) {
        
        return <Component {...props} />;
      }
      return <Redirect to="/" />;
    }}
  />
);

const mapStateToProps = ( {user} ) => ({user});

export default connect(mapStateToProps)(GuestRoute);
