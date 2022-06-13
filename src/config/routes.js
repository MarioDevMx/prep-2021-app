import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { LogoutUser, setUserSession } from '../store/api/authApi';

// screens
import Home from '../screens/Home';
import Login from '../screens/Login';
import CapturaVotos from '../screens/CapturaVotos';
import PromovidosConteoRapido from '../screens/PromovidosConteoRapido';
import SideMenu from '../components/SideMenu';
import Camera from '../components/Camera';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const LoginStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="IndexHome" component={Home} />
    </Stack.Navigator>
  );
};

const CapturaVotosStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CapturaVotos" component={CapturaVotos} />
      <Stack.Screen name="CapturaCamara" component={Camera} />
    </Stack.Navigator>
  );
};

const PromovidosConteoRapidoStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PromovidosConteoRapido" component={PromovidosConteoRapido} />
    </Stack.Navigator>
  );
};

const RootStack = (props) => {
  const userLogged = useSelector((state) => state.UserLogged);
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);
  
  useEffect(() => {
    if (userLogged.Activo) {
      setIsLogged(true);
    } else {
      const bootstrapAsync = async () => {
        try {
          const userInfo = await AsyncStorage.getItem('current_session');
          if (userInfo) {
            const info = JSON.parse(userInfo);
            dispatch(setUserSession(info));
          } else {
            setIsLogged(false);
          }
        } catch (error) {
          console.log(error)
        }
      }
      bootstrapAsync();
    }
  }, [userLogged])
  return isLogged ? (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{
        backgroundColor: '#fff',
        width: 230,
      }}
      initialRouteName="Home"
      drawerContent={(props) => <SideMenu {...props}/>}
    >
      {/* <Stack.Screen name="Login" component={LoginStackNavigator} /> */}
      <Stack.Screen name="Home" component={HomeStackNavigator} />
      <Stack.Screen name="CapturaVotos" component={CapturaVotosStackNavigator} />
      <Stack.Screen name="PromovidosConteoRapido" component={PromovidosConteoRapidoStackNavigator} />
    </Drawer.Navigator>
  ) : (
    <Stack.Navigator
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={LoginStackNavigator} 
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;