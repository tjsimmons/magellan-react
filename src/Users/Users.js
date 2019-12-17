import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteUser } from "../api/userApi";
import { Link, useHistory } from "react-router-dom";
import "./users.css";
import * as userActions from "../redux/actions/userActions";

const Users = ({ loadUsers, users }) => {
  // react router history hook
  const history = useHistory();
  // array destructuring
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers().finally(() => setIsLoading(false));
  }, [loadUsers]); // second argument is a array of dependencies - empty array means only run once, not every time this is re-rendered

  const handleDeleteUser = id => {
    //  deleteUser(id).then(() => setUsers(users.filter(u => u.id !== id)));
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
                {/* using props provided by react router to push state onto the browser */}

                {/* couple of ways to do react router redirects
                 * location (url metadata)
                 * history (programmatic redirects)
                 * match (info on matched URL) */}
                <button onClick={() => history.push(`/user/${u.id}`)}>
                  Edit
                </button>
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

// What Redux data should be injected on props in the component above?
const mapStateToProps = state => {
  return { users: state.users };
};

// What Redux actions should be injected on props in the component above?
const mapDispatchToProps = {
  loadUsers: userActions.loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
