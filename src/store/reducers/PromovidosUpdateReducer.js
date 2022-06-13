import { PUT_PROMOVIDOS, CLEAN_PROMOVIDOS } from "./types";

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PUT_PROMOVIDOS:
      return action.payload;
    case CLEAN_PROMOVIDOS:
      return INITIAL_STATE;
    default:
      return state;
  }
}