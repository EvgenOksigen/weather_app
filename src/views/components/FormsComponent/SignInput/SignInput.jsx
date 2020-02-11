import React from "react";

const Input = ({ input, meta: { touched, error }, type }) => {
  return (
    <input
      {...input}
      onChange={e => {
        input.onChange(e);
      }}
      type={type}
    />
  );
};

export default Input;
