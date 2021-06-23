/*
  Manage authenticated user
*/

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const authenticatedUserReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.data;
    case LOGOUT:
      return action.data;
    default:
      return state;
  }
};

export const loginUser = (user) => {
  return {
    type: LOGIN,
    data: user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
    data: null,
  };
};

export default authenticatedUserReducer;
