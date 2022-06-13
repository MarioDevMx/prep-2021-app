import { GET_CASILLAS, GET_CASILLAS_ERROR } from "./types";

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CASILLAS:
      return action.payload;
    case GET_CASILLAS_ERROR:
      console.log('GET_CASILLAS_ERROR: ', action);
      return {
        data: null,
        error: action?.errorMessage,
      };
    default:
      return state;
  }
}