import React, { useState } from "react";

const Users = function() {
  // array destructuring
  const [users, setUsers] = useState([]);

  const deleteUser = function(id) {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.length === 0 && "No users."}
        {users.map(u => (
          <li key={u.id}>
            <button onClick={() => deleteUser(u.id)}>Delete</button> {u.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Users;
