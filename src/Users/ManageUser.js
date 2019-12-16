import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { addUser } from "../api/userApi";
import Input from "../reusable/Input";
import { Link, Redirect } from "react-router-dom";

const ManageUser = ({ setSnackbar }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [saveCompleted, setSaveCompleted] = useState(false);
  const [user, setUser] = useState({
    id: null,
    name: "",
    role: ""
  });

  const handleChange = ({ target }) => {
    if (target.value) {
      setErrors({ ...errors, [target.name]: null });
    }

    setUser({ ...user, [target.name]: target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!isValid()) {
      return;
    }

    setIsSaving(true);

    addUser(user)
      .then(() => {
        setSaveCompleted(true);
        setSnackbar({ message: "User saved" });
      })
      .catch(error => {
        console.error(error);
        setSnackbar({ message: error.message });
        setIsSaving(false);
      });
  };

  const isValid = () => {
    const _errors = {};

    if (!user.name) {
      _errors.name = "Name is required.";
    }

    if (!user.role) {
      _errors.role = "Role is required.";
    }

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  };

  return (
    <>
      <h1>Add User</h1>
      <Link to="/users">Return to Users</Link>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        {saveCompleted && <Redirect to="/users" />}
        <Input
          id="name"
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          id="role"
          label="Role"
          name="role"
          value={user.role}
          onChange={handleChange}
          error={errors.role}
        />
        <input
          type="submit"
          value="Save"
          disabled={isSaving ? "disabled" : ""}
        />
      </form>
    </>
  );
};

ManageUser.propTypes = {
  setSnackbar: PropTypes.func.isRequired
};

export default ManageUser;
