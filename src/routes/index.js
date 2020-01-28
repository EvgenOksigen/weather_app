import React from 'react';
import { Route, Switch } from "react-router-dom";
// import { connect } from "react-redux";
import Auth from "../views/pages/Auth/Auth";

class App extends React.Component {
  render () { 
    return(
      <Switch>
        <Route path="/" exact component={Auth}></Route>
      </Switch>
    )
  }
}

// const mapStateToProps = ({ user }) => ({ user });

// const mapDispatchToProps = { me, setMe };

// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default (App);
