import { CLEAR_PHOTO, SAVE_PHOTO } from "./types";

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_PHOTO:
      return action.data;
    case CLEAR_PHOTO:
      return {};
    default:
      return state;
  }
}