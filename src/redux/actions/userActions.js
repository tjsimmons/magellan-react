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
