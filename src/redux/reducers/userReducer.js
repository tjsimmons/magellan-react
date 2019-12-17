export const userReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_USERS_SUCCESS":
      return action.users;
    case "DELETE_USER_SUCCESS":
      return state.filter(u => u.id !== action.id);
    default:
      // if we don't care about the action
      // just return the existing state
      return state;
  }
};

export default userReducer;
