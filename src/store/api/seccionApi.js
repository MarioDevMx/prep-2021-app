import { apiToken } from "../../config/constants";
import { http } from "../../config/requests";
import {
  GET_SECCIONES,
} from '../reducers/types';

export const getSecciones = (payload) => {
  return (dispatch) => {
    const url = `Usuario/GetRelUsuario`;
    const params = {
      pwdApp: apiToken,
      '_idusuario': payload.item.IdUsuario,
      '_ideleccion': payload.item.Ideleccion,
      '_idseccion': 'null',
    }
    http.get(url, {params: params})
      .then(
        (response) => {
          // console.log('Response de secciones', response)
          dispatch({
            type: GET_SECCIONES,
            payload: response.data,
          });
          payload.context.setSecciones ? payload.context.setSecciones(response.data) : undefined;
        }
      )
      .catch(
        (error) => {
          console.log(error.response);
        }
      )
  }
}