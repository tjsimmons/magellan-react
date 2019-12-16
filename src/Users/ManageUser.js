import React from "react";
import { useState } from "react";
import { addUser } from "../api/userApi";
import Input from "../reusable/Input";
import { Link, Redirect } from "react-router-dom";
import { Snackbar } from "@material-ui/core";

const ManageUser = function() {
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState(null);
  const [saveCompleted, setSaveCompleted] = useState(false);
  const [user, setUser] = useState({
    id: null,
    name: "",
    role: ""
  });

  const handleChange = function({ target }) {
    if (target.value) {
      setErrors({ ...errors, [target.name]: null });
    }

    setUser({ ...user, [target.name]: target.value });
  };

  const handleSubmit = function(e) {
    e.preventDefault();

    if (!isValid()) {
      return;
    }

    setIsSaving(true);

    addUser(user)
      .then(() => {
        setSaveCompleted(true);
      })
      .catch(error => {
        console.error(error);
        setSnackbar({ show: true, message: error.message });
        setIsSaving(false);
      });
  };

  const isValid = function() {
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

  const closeSnackbar = function() {
    setSnackbar(null);
  };

  return (
    <>
      <h1>Add User</h1>
      <Link to="/users">Return to Users</Link>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        {saveCompleted && <Redirect to="/users" />}
        {snackbar && (
          <Snackbar
            message={snackbar.message}
            open
            autoHideDuration={6000}
            onClose={closeSnackbar}
            anchorOrigin={{
              horizontal: "center",
              vertical: "top"
            }}
            transitionDuration={500}
          />
        )}
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

export default ManageUser;
