import React, { useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView} from 'react-native';
// import { Button } from 'react-native-paper';
import Header from '../components/Header';
import ContainerApp from '../components/ContainerApp.js';
import { IconButton, TextInput, Divider } from 'react-native-paper';
import { Container, Content, Form, Item, Input, Label, Button, Icon, Thumbnail} from 'native-base';
import * as globalStyles from '../config/styles';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../store/api/authApi';

const Home = ({navigation}) => {
  const [text, setText] = React.useState('');
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.UserLogged);
  const logout = () => {
    dispatch(LogoutUser());
  };
  
  useEffect(() => {
    console.log('userLogged', userLogged)
  }, []);
  return (
    <View style={styles.main}>
      <Header menuBtn title='INICIO'/>
      <ScrollView>
        <View style={styles.thumbnail}>
          <TouchableOpacity
            onPress={() => {
            }}>
            <ImageBackground
              source={
                userLogged.FotoEleccion ? {uri: 'data:image/*;base64,' + userLogged.FotoEleccion} : require('../assets/images/user-image.png')
              }
              style={{height: 150, width: 150}}
              imageStyle={{borderRadius: 100}}>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginBottom: '10%', marginHorizontal: '3%'}}>
          <Text style={[globalStyles.giantTitle]}>
            {userLogged.Candidato ? userLogged.Candidato : ''}
          </Text>
          <Text style={[globalStyles.subtitle]}>
            {userLogged.Eleccion ? userLogged.Eleccion : ''}
          </Text>
        </View>
        {/* <View style={styles.row}>
          <Image
            source={require('../assets/images/icons/iconos32/seguridad.png')}
            style={styles.rowIcon}
          />
          <View>
            <Text style={styles.labelText}>
              JAAAAAAAA
            </Text>
          </View>
        </View> */}
        {/* <View>
          <Button iconLeft dark bordered style={styles.selectButtonMenu}>
          <Icon type="FontAwesome" name="lock" style={styles.iconEstimate} />
            <Text style={styles.content}>SEGURIDAD</Text>
          </Button>
        </View> */}
        <View>
          <Button iconLeft dark bordered style={styles.selectButtonMenu}
          onPress={() => navigation.navigate('CapturaVotos')}>
          <Icon type="FontAwesome" name="edit" style={styles.iconEstimate} />
            <Text style={styles.content}>CAPTURA</Text>
          </Button>
        </View>
        {/* <View>
          <Button iconLeft dark bordered style={styles.selectButtonMenu}>
          <Icon type="FontAwesome" name="signal" style={styles.iconEstimate} />
            <Text style={styles.content}>GRAFICOS</Text>
          </Button>
        </View> */}
        <View>
          <Button iconLeft dark bordered style={styles.selectButtonMenu}
          onPress={() => navigation.navigate('PromovidosConteoRapido')}>
          <Icon type="FontAwesome" name="users" style={styles.iconEstimate} />
            <Text style={styles.content}>PROMOVIDOS</Text>
          </Button>
        </View>
        {/* <View>
          <Button iconLeft dark bordered style={styles.selectButtonMenu}>
          <Icon type="FontAwesome" name="archive" style={styles.iconEstimate} />
            <Text style={styles.content}>ASIGNAR CASILLAS</Text>
          </Button>
        </View> */}
        <View>
          <Button
            onPress={() => logout()}
            style={styles.selectButton}>
            <Text style={styles.selectButtonText}>SALIR</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    backgroundColor: '#bdc3c7',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 18,
  },
  textHeader: {
    paddingEnd: 10,
  },
  iconEstimate: {
    fontSize: 20,
    color: '#475057',
  },
  sizeImage: {
    alignSelf: 'center',
    height: 300,
    width: '100%',
  },
  viewField: {
    marginBottom: 15,
  },
  inputLogin: {
    marginBottom: 10,
    marginEnd: 25,
    marginStart: 25,
  },
  selectButtonMenu: {
    borderRadius: 15,
    elevation: 1,
    margin: 0,
    padding: 0,
    width: '80%',
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '2%',
    marginEnd: 10,
    marginStart: 10,
    backgroundColor: '#fff'
  },
  selectButton: {
    backgroundColor: '#435f65',
    borderRadius: 25,
    elevation: 1,
    margin: 0,
    padding: 0,
    width: '50%',
    alignSelf: 'center',
    marginTop: '7%',
    marginBottom: '10%',
    marginEnd: 10,
    marginStart: 10,
  },
  selectButtonText: {
    alignContent: 'center',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: globalStyles.FONT_LABEL_SIZE,
    fontFamily: globalStyles.FONT_FAMILY,
  },
  content: {
    alignContent: 'center',
    width: '100%',
    // textAlign: 'center',
    paddingLeft: 15,
    color: '#7d7d7d',
    fontSize: globalStyles.FONT_LABEL_SIZE,
    fontFamily: globalStyles.FONT_FAMILY,
  },
  thumbnail: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: '10%',
    marginBottom: '1%',
  },
  rowIcon: {
    marginRight: '5%',
  },
  row: {
    marginBottom: '5%',
    flexDirection: 'row',
  },
  labelText: {
    fontFamily: globalStyles.FONT_FAMILY_SEMIBOLD,
    fontSize: globalStyles.FONT_LABEL_SIZE,
    marginBottom: '3%',
  },
})

export default Home;