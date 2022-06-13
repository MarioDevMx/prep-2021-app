import { apiToken } from "../../config/constants";
import { http } from "../../config/requests";
import {
  GET_PROMOVIDOS,
  PUT_PROMOVIDOS,
  CLEAN_PROMOVIDOS,
} from '../reducers/types';

export const getConteoRapidoPromovidos = (payload) => {
  return (dispatch) => {
    const url = `ConteoRapido/GetPromovidos`;
    const params = {
      pwdApp: apiToken,
      'idpromovido': 'null',
      'ideleccion': payload.item.ideleccion,
      'idseccion': payload.item.idseccion,
      'idcasilla': payload.item.idcasilla,
    }
    http.get(url, {params: params})
      .then(
        (response) => {
          console.log('Response de getConteoRapidoPromovidos', response)
          dispatch({
            type: GET_PROMOVIDOS,
            payload: response.data,
          });
        }
      )
      .catch(
        (error) => {
          console.log(error.response);
        }
      )
  }
}

export const putConteoRapidoPromovidos = (payload, props) => {
  console.log('putConteoRapidoPromovidos--1', payload);
  console.log('putConteoRapidoPromovidos--2', props);
  return (dispatch) => {
    const url = `ConteoRapido/EditPromovidos?pwdApp=${apiToken}`;
    const params = {
      'Idpromovido': payload.item.Idpromovido,
      'Votos': payload.item.Votos,
      'Voto_seguro': payload.item.Voto_seguro,
    }
    console.log('putConteoRapidoPromovidos--3', params);
    http.put(url, params)
    .then((response) => {
      console.log('Response de putConteoRapidoPromovidos', response)
      dispatch({
        type: PUT_PROMOVIDOS,
        payload: response.data,
      });
      payload.context.setLoading(false);
      payload.context.setLoading2(false);
    })
    .catch((error) => {
      console.log(error.response)
      payload.context.setLoading(false);
      payload.context.setLoading2(false);
    })
  }
}

export const clearConteoRapidoPromovidos = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_PROMOVIDOS,
    });
  };
};