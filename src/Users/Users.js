import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, addUser } from "../api/userApi";
import "./users.css";
import Input from "../reusable/Input";

const Users = function() {
  // array destructuring
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: null,
    name: "",
    role: ""
  });
  const [isSaving, setIsSaving] = useState(false);

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

    setIsSaving(true);

    addUser(user)
      .then(savedUser => setUsers([...users, savedUser]))
      .finally(() => {
        setUser({ name: "", role: "" });

        setIsSaving(false);
      });
  };

  const handleChange = function({ target }) {
    setUser({ ...user, [target.name]: target.value });
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
        />
        <Input
          id="role"
          label="Role"
          name="role"
          value={user.role}
          onChange={handleChange}
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
