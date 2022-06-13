import { CLEAR_PHOTO, SAVE_PHOTO } from "../reducers/types";

export const savePhoto = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_PHOTO,
      data: payload,
    })
  }
};

export const clearPhoto = (payload) => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PHOTO,
    })
  }
};