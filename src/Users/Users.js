import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, addUser } from "../api/userApi";
import "./users.css";
import Input from "../reusable/Input";

const Users = function() {
  // array destructuring
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    id: null,
    name: "",
    role: ""
  });

  useEffect(() => {
    getUsers()
      .then(users => setUsers(users))
      .finally(() => setIsLoading(false));
  }, []); // second argument is a array of dependencies - empty array means only run once, not every time this is re-rendered

  const handleDeleteUser = function(id) {
    deleteUser(id).then(() => setUsers(users.filter(u => u.id !== id)));
  };

  const handleSubmit = function(e) {
    e.preventDefault();

    if (!isValid()) {
      return;
    }

    setIsSaving(true);

    addUser(user)
      .then(savedUser => setUsers([...users, savedUser]))
      .finally(() => {
        setUser({ name: "", role: "" });

        setIsSaving(false);
      });
  };

  const handleChange = function({ target }) {
    if (target.value) {
      setErrors({ ...errors, [target.name]: null });
    }

    setUser({ ...user, [target.name]: target.value });
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

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
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
      <br />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="3">No users.</td>
            </tr>
          )}
          {users.map(u => (
            <tr key={u.id}>
              <td>
                <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
              </td>
              <td>{u.name}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
