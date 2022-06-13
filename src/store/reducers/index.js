import {combineReducers} from 'redux';
import CameraReducer from './CameraReducer';
import HomeReducer from './HomeReducer';
import UserReducer from './UserReducer';
import CasillasReducer from './CasillasReducer';
import SeccionesReducer from './SeccionesReducer';
import PromovidosReducer from './PromovidosReducer';
import PromovidosUpdateReducer from './PromovidosUpdateReducer';

export default combineReducers({
  Home: HomeReducer,
  UserLogged: UserReducer,
  Casillas: CasillasReducer,
  Secciones: SeccionesReducer,
  Promovidos: PromovidosReducer,
  PromovidosUpdate: PromovidosUpdateReducer,
  Camera: CameraReducer,
});
