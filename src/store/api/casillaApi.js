import { apiToken } from "../../config/constants";
import { http } from "../../config/requests";
import {
  GET_CASILLAS,
} from '../reducers/types';

export const getCasillas = (payload) => {
  return (dispatch) => {
    const url = 'Casilla/GetCasilla';
    const params = {
      pwdApp: apiToken,
      '_idseccion': payload.item.IdSeccion,
      '_idcasilla': 'null',
      '_seccion': 'null',
    }
    http.get(url, {params: params})
      .then(
        (response) => {
          // console.log('Response de getCasillas', response);
          dispatch({
            type: GET_CASILLAS,
            payload: response.data,
          });
          payload.context.setCasillas ? payload.context.setCasillas(response.data) : undefined;
        }
      )
      .catch(
        (error) => {
          console.log('error', error.response);
        }
      )
  }
};
