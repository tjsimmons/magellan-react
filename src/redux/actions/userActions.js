import * as userApi from "../../api/userApi";

// Synchronous action creator
export const loadUsersSuccess = users => {
  return { type: "LOAD_USERS_SUCCESS", users };
};

// Thunk - async action creator
// blah blah point free, holla
// also can't debugger it
// but boy it's concise
/*export const loadUsers = () => dispatch =>
  userApi.getUsers().then(users => dispatch(loadUsersSuccess(users)));*/

// how i wrote it originally
export const loadUsers = () => {
  return dispatch => {
    return userApi.getUsers().then(users => dispatch(loadUsersSuccess(users)));
  };
};

export const deleteUserSuccess = id => {
  return { type: "DELETE_USER_SUCCESS", id };
};

export const deleteUser = id => {
  return dispatch => {
    return userApi.deleteUser(id).then(() => dispatch(deleteUserSuccess(id)));
  };
};

export const saveUserSuccess = user => {
  return { type: "SAVE_USER_SUCCESS", user };
};

export const saveUser = user => {
  return dispatch => {
    return userApi.saveUser(user).then(() =>
      dispatch({
        type: user.id ? "EDIT_USER_SUCCESS" : "ADD_USER_SUCCESS",
        user
      })
    );
  };
};
