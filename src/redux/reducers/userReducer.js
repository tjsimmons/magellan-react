export const userReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_USERS_SUCCESS":
      return action.users;
    case "DELETE_USER_SUCCESS":
      return state.filter(u => u.id !== action.id);
    case "ADD_USER_SUCCESS":
      return [...state, action.user];
    case "EDIT_USER_SUCCESS":
      return state.map(user =>
        user.id === action.user.id ? action.user : user
      );
    case "GET_USER_SUCCESS":
      return action.user;
    default:
      // if we don't care about the action
      // just return the existing state
      return state;
  }
};

export default userReducer;
