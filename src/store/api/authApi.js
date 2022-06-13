import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiToken } from '../../config/constants';
import {http} from '../../config/requests';
import { CLEAR_SESSION, LOGIN_SUCCESS, SET_USER_SESSION } from '../reducers/types';

export const loginUser = (payload) => {
  return (dispatch) => {
    const url = "Usuario";
    const params = {
      pwdApp: apiToken,
      loginApp: payload.item.user,
    }
    http.get(url, {params:params})
      .then(
        (response) => {
          if (response.data && response.data[0]) {
            const userInfo = response.data[0];
            if (payload.item.password === userInfo.PwdApp) {
              console.log('contrasena correcta!')
              const storeData = async () => {
                try {
                  const jsonValue = JSON.stringify(userInfo);
                  await AsyncStorage.setItem('current_session', jsonValue);
                } catch (e) {
                  // error
                }
              }
              storeData();
              dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data[0],
              })
            } else {
              payload.context.setErrorMessages('Usuario o Contrasena incorrecta.');
              payload.context.setLoading(false);
            }
          } else {
            payload.context.setErrorMessages('Usuario o Contrasena incorrecta.');
            payload.context.setLoading(false);
          }
        }
      )
      .catch(
        (error) => {
          console.log('Error', error)
        }
      )
  }
}

export const setUserSession = (userInfo) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_SESSION,
      payload: userInfo,
    })
  }
}

export const LogoutUser = (props) => {
  return (dispatch) => {
    AsyncStorage.clear();
    dispatch({
      type: CLEAR_SESSION,
    })
  }
}