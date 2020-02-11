import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import "./LogIn.css";
import { Button, Form, message } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { signIn } from "../../../state/ducks/user/actions";
import Input from "../../components/FormsComponent/SignInput/SignInput";

class LoginForm extends Component {
  //
  state = {
    loading: false
  };

  formSubmit = e => {
    e.preventDefault();

    const { handleSubmit, signIn } = this.props;

    handleSubmit(values => {
      //
      this.setState({ loading: false });

      return signIn(values).then(() => {
        this.setState({ loading: false });
        // message.success("Вы успешно вошли");
      });
    })();
  };

  showResults = user => {
    console.log(user);
  };

  render() {
    return (
      <Form
        autoComplete="off"
        className="login-form paper"
        onSubmit={this.formSubmit}
      >
        <h1>Log in</h1>

        <div className="auth-form-field">
          <label> Email / name </label> {/*TODO */}
          <Field
            name="nameOrMail"
            component={Input}
            type="text"
            placeholder="Email or username"
          />
        </div>

        <div className="auth-form-field">
          <label> Password </label>
          <Field
            name="password"
            component={Input}
            type="password"
            placeholder="Password"
          />
        </div>

        <Button disabled={false} htmlType="submit" type="primary">
          Sign in
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = { signIn };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "login" })
);

export default enhance(LoginForm);
