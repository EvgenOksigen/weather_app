import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import "./LogIn.css";
import { Button, Form } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { signIn } from "../../../state/ducks/user/actions";
import Input from "../../components/FormsComponent/SignInput/SignInput";
import Axios from "axios";

class LoginForm extends Component {
  //

  formSubmit = e => {
    e.preventDefault();

    const { handleSubmit, signIn } = this.props;

    handleSubmit(values => {
      // signIn(values);
      (async () => {
        const rawResponse = await fetch("http://localhost:3010/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ values })
        });
        const content = await rawResponse.json();

        console.log(content);
      })();

      // Axios.post("http://localhost:3010/users").then(res =>
      //   console.log(res.data))
    })();
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
          <Field
            label="Email / name"
            name="nameOrMail"
            component={Input}
            type="text"
            placeholder="Email or username"
          />
        </div>

        <div className="auth-form-field">
          <Field
            label="Password"
            name="password"
            component={Input}
            type="password"
            placeholder="Password"
          />
        </div>

        <Button name="log-in-bnt" className="log-in-btn" htmlType="submit">
          <i className="fas fa-sign-in-alt"></i>
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
