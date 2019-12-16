import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../api/userApi";
import { Link } from "react-router-dom";
import "./users.css";

const Users = function() {
  // array destructuring
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(users => setUsers(users))
      .finally(() => setIsLoading(false));
  }, []); // second argument is a array of dependencies - empty array means only run once, not every time this is re-rendered

  const handleDeleteUser = function(id) {
    deleteUser(id).then(() => setUsers(users.filter(u => u.id !== id)));
  };

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <h1>Users</h1>
      <Link to="/user">Add User</Link>
      <br />
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
