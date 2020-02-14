import React from "react";

const Input = ({
  input,
  meta: { touched, error },
  type,
  label,
  required,
  placeholder,
  notification
}) => {
  return (
    <>
      {label === "empty" ? (
        <label>&nbsp;</label>
      ) : (
        <label className={required && "required"}>
          {label}:{" "}
          {notification && (
            <span className="notification">( {notification} )</span>
          )}
        </label>
      )}

      <input
        {...input}
        placeholder={placeholder}
        onChange={e => {
          input.onChange(e);
        }}
        type={type}
      />
    </>
  );
};

export default Input;
