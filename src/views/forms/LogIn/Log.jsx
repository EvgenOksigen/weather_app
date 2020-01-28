import React from "react";
import { reduxForm, Field } from "redux-form";

import "./LogIn.css";

let LoginForm = ({ handleSubmit, submitting }) => {
  //
  console.log(submitting);

  function showResults(values) {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  }

  return (
    <>
      <form className="login-form paper" onSubmit={handleSubmit(showResults)}>
        <div>
          <label> First Name </label>
          <Field name="firstName" component="input" placeholder="First Name" />
        </div>
        <div>
          <label> Last Name </label>
          <Field name="lastName" component="input" placeholder="Last Name" />
        </div>
        <div>
          <label> Email </label>
          <Field name="email" component="input" placeholder="Email" />
        </div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </form>
    </>
  );
};

LoginForm = reduxForm({
  form: "login",
  destroyOnUnmount: false
})(LoginForm);

export default LoginForm;
