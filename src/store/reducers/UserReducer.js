import { CLEAR_SESSION, LOGIN_SUCCESS, SET_USER_SESSION } from "./types";

const INITIAL_STATE = {
  name: 'John Doe',
  Age: 23,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload;
    case SET_USER_SESSION:
      return action.payload;
    case CLEAR_SESSION:
      return {};
    default:
      return state;
  }
}