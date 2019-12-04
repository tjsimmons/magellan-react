import React from "react";
import PropTypes from "prop-types";

const Input = function({ id, label, type, name, value, onChange, error }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

Input.propTypes = {
  /** HTML ID */
  id: PropTypes.string.isRequired,

  /** Input label */
  label: PropTypes.string.isRequired,

  /** Input name */
  name: PropTypes.string.isRequired,

  /** Input value */
  value: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired,
  /**
   ### One of
   - text
   - number
   - date
   - email
   - password
   - tel
   */

  type: PropTypes.oneOf(["text", "number", "date", "email", "password", "tel"]),

  /** Error message to show */
  error: PropTypes.string
};

Input.defaultProps = {
  type: "text"
};

export default Input;
