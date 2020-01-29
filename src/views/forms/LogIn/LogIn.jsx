import React, { Component } from "react";
import { reduxForm, Field, getFormValues } from "redux-form";
import { connect } from "react-redux";
import { Form, Button, Input, message } from "antd";
import { compose } from "redux";

// import { required } from "../../../helpers/validate";
// import { throwFormErrorJournal } from "../../../helpers/throwFormError";
// import { signIn } from "../../../state/ducks/user/actions";

import "./LogIn.css";
// import "../../../styles/components.less";

class LogIn extends Component {
  state = {
    loading: false
  };

  formSubmit = e => {
    e.preventDefault();
    console.log(this.props.form);

    const { handleSubmit, signIn } = this.props;

    handleSubmit(values => {
      this.setState({ loading: true });

      return signIn(values)
        .then(() => {
          this.setState({ loading: false });

          message.success("Ви успішно увійшли у систему E-Consul");
        })
        .catch(err => {
          this.setState({ loading: false });

          message.error("Щось пішло не так. Повторіть запит знову.");
        });
    })();
  };

  render() {
    // const { loading } = this.state;

    // const { dirty, invalid } = this.props;

    return (
      <Form
        autoComplete="off"
        className="login-form paper"
        onSubmit={this.formSubmit}
      >
        {/* <div className="logo">
          <img src={logo} alt="minua" />
        </div> */}

        <h1>Авторизація</h1>

        <div className="split-line" />

        <Field
          name="username"
          component={Input}
          type="text"
          label="Ім'я користувача"
          placeholder="Введіть ім'я користувача"
          // validate={[required]}
          icon="user"
        />

        <Field
          name="password"
          component={Input}
          type="password"
          label="Пароль"
          placeholder="Введіть пароль"
          // validate={[required]}
          icon="lock"
        />

        <Button htmlType="submit">Log in</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.formInitialValues,
  formValues: getFormValues("login")(state)
});

const mapDispatchToProps = {}; //signIn

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "login" })
);

export default enhance(LogIn);
