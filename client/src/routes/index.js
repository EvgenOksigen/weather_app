import React from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../views/pages/Auth/Auth";
import DefaultRoute from './default'
import GuestRoute from './hoc/GuestRoute';
import Trello from '../views/pages/Trello/Trello'

import { me, setMe } from "../state/ducks/user/actions";
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { user } = nextProps;

    if (user && user.isLogged && !user.login) {
      this.setState({ loading: true });

      this.getMe();
    }
  }

  render () { 
    const {loading}= this.state;
    return(
      <>
        {!loading && (
          <Switch>
            <Route path="/" exact component={DefaultRoute} />

            <GuestRoute path="/login" exact component={Auth} />

            <PrivateRoute path="/home" exact component={Trello}/>
          </Switch>
          )
        
        }
      </>
     ) 
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = { me, setMe };

export default connect(mapStateToProps, mapDispatchToProps)(App);