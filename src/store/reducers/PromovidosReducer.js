import { GET_PROMOVIDOS, GET_PROMOVIDOS_ERROR } from "./types";

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROMOVIDOS:
      return action.payload;
    case GET_PROMOVIDOS_ERROR:
      console.log('GET_PROMOVIDOS_ERROR: ', action);
      return {
        data: null,
        error: action?.errorMessage,
      };
    default:
      return state;
  }
}