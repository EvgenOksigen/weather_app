import React from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../views/pages/Auth/Auth";
import DefaultRoute from './default'
import GuestRoute from './hoc/GuestRoute';

import { me, setMe } from "../state/ducks/user/actions";
import PrivateRoute from './hoc/PrivateRoute';
import Home from '../views/pages/Home/Home';
import Admin from '../views/pages/Admin/Admin';
import Teacher from '../views/pages/Teacher/Teacher';
import Student from '../views/pages/Student/Student';

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

    if (user && user.isLogged && !user.email) {
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

            <PrivateRoute path="/home" exact  component={Home}/>
        
            <Route path="/home/admin" exact render={() => <Admin />} />

            <Route path="/home/teacher" exact render={() => <Teacher />} />

            <Route path="/home/student" exact render={() => <Student />} />

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