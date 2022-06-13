import { Alert } from "react-native"
import { apiToken } from "../../config/constants"
import { http } from "../../config/requests"

export const getRegistrosPrep = (payload) => {
  return (dispatch) => {
    const url = 'ConteoRapido/GetConteoRapido'
    const params = {
      pwdApp: apiToken,
      ideleccion: payload.item.idEleccion,
      idseccion: payload.item.idSeccion,
      idcasilla: payload.item.idCasilla,
    }
    http.get(url, {params})
      .then(
        (response) => {
          console.log(response)
          if (response.data) {
            payload.context.setRegistrosPrep(response.data[0])
          }
        }
      )
      .catch(
        (error) => {
          console.log(error.response)
        }
      )
  }
}

export const saveCapturaVotos = (payload) => {
  return (dispatch) => {
    const url = `ConteoRapido/EditConteoRapido?pwdApp=${apiToken}`
    const params = payload.item;
    http.put(url, params)
      .then(
        (response) => {
          console.log(response)
          Alert.alert('','Datos guardados con exito!')
          payload.context.setLoadingBtn ? payload.context.setLoadingBtn(false) : undefined
        }
        )
        .catch(
          (error) => {
            console.log(error.response)
            Alert.alert('','Ha ocurrido un error')
        }
      )
  }
}
