import React from "react";

// import "./Input.less";
// import "../FormComponents.less";

const Input = ({ input, meta: { touched, error }, type }) => {
  console.log(input);
  return (
    <input
      {...input}
      onChange={e => {
        console.log(true);

        input.onChange(e);
      }}
      type={type}
    />
  );
};

export default Input;
