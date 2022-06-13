import { GET_SECCIONES, GET_SECCIONES_ERROR } from "./types";

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SECCIONES:
      return action.payload;
    case GET_SECCIONES_ERROR:
      console.log('GET_SECCIONES_ERROR: ', action);
      return {
        data: null,
        error: action?.errorMessage,
      };
    default:
      return state;
  }
}