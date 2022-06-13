import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native';
import { Avatar, Drawer } from 'react-native-paper';
import {AwesomeIcon} from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../store/api/authApi';

const SideMenu = (props) => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.UserLogged);
  const logout = () => {
    dispatch(LogoutUser());
  }
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <ImageBackground style={styles.imgBanner}
            source={
              userLogged.FotoEleccion ? {uri: 'data:image/*;base64,' + userLogged.FotoEleccion} : require('../assets/images/banner.jpeg')
            }
          >
            <View style={styles.overlay}>
              <Avatar.Image size={60} source={
                userLogged.FotoUsuario ? {uri: 'data:image/*;base64,' + userLogged.FotoUsuario} : require('../assets/images/user-image.png')
              }
              />
              <Text style={styles.textBanner}>{userLogged.NombreApp ? userLogged.NombreApp : ''}</Text>
            </View>
          </ImageBackground>
          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              label="Inicio"
              icon='home'
              onPress={() => props.navigation.navigate('Home')}
            />
            {/* <Drawer.Item
              label="Seguridad"
              icon='security'
              onPress={() => console.log('to Seguridad')}
            /> */}
            <Drawer.Item
              label="Captura"
              icon='pencil-outline'
              onPress={() => props.navigation.navigate('CapturaVotos')}
            />
            {/* <Drawer.Item
              label="Graficos"
              icon='chart-pie'
              onPress={() => console.log('to Graficos')}
            /> */}
            <Drawer.Item
              label="Promovidos"
              icon='account-multiple'
              onPress={() => props.navigation.navigate('PromovidosConteoRapido')}
            />
            {/* <Drawer.Item
              label="Asignar Casillas"
              icon='package-variant'
              onPress={() => console.log('to Asignar Casillas')}
            /> */}
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              label="Cerrar Sesion"
              icon='power'
              onPress={() => logout()}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    // flex: 1,
  },
  imgBanner: {
    resizeMode: 'cover',
    width: '100%',
    height: 157,
  },
  textBanner: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
    fontFamily: 'Montserrat-Medium'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  drawerSection: {
    marginTop: 10,
  }
});

export default SideMenu;