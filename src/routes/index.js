import React from 'react';
import { Route, Switch } from "react-router-dom";
// import { connect } from "react-redux";
import Auth from "../views/pages/Auth/Auth";
import DefaultRoute from './default'
import PhoneBook from '../PhoneBook'
import GuestRoute from './hoc/GuestRoute';

import { me, setMe } from "../state/ducks/user/actions";
import { connect } from 'react-redux';
import PrivateRoute from './hoc/PrivateRoute';

class App extends React.Component {
  state = {
    loading: true,
    resources: []
  };

  componentDidMount() {
    this.getMe();
  }

  getMe = async () => {
    const { me } = this.props;

    const token = localStorage.getItem("token");

    if (token) {
      await me().catch(() => {
        localStorage.removeItem("token");
      });
    }

    this.setState({ loading: false });
  };

  render () { 
    return(
      <Switch>
        <Route path="/" exact component={DefaultRoute} />

        <GuestRoute path="/login" exact component={Auth} />

        <PrivateRoute path="/home" exact component={PhoneBook}/>
      </Switch>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = { me, setMe };

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default (App);