import React, { useState } from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import ContainerApp from '../components/ContainerApp.js';
import { IconButton, TextInput, Divider } from 'react-native-paper';
import { Container, Content, Form, Item, Input, Label, Button, Icon, Spinner} from 'native-base';
import * as globalStyles from '../config/styles';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/api/authApi';
import { Formik } from 'formik';
import * as yup from 'yup'

// import { Right, Icon } from 'native-base';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);
  const dispatch = useDispatch();

  const sendData = (values) => {
    // console.log('goToNext', navigation);
    // navigation.navigate('Home');
    setErrorMessages(null);
    setLoading(true);
    dispatch(loginUser({
      item: values,
      context: {
        navigation,
        setLoading,
        setErrorMessages,
      }
    }))
  };
  return (
    <ContainerApp>
      <View style={styles.container}>
        <Text style={styles.textHeader}>
          <Text style={styles.title}>REGISTRARSE </Text>
          <Icon type="FontAwesome" name="plus-circle" style={styles.iconEstimate} />
        </Text>
      </View>
      <View style={styles.viewField}>
        <Image
          source={require('../assets/images/logoylogin.jpg')}
          style={styles.sizeImage}
        />
      </View>
      <Formik
        initialValues={{
          user: '',
          password: '',
        }}
        onSubmit={(values) => {
          sendData(values)
        }}
        validationSchema={yup.object().shape({
          user: yup.string().required('* El campo es requerido'),
          password: yup.string().required('* El campo es requerido'),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          handleBlur,
          touched,
          handleSubmit,
          isValid
        }) => (
          <>
            <View style={styles.inputLogin}>
              <Item rounded>
                <Input
                  placeholder='Usuario'
                  onChangeText={handleChange('user')}
                  onBlur={handleBlur('user')}
                  value={values.user}
                />
              </Item>
            </View>
            {errors && errors.user && (
              <Text style={styles.textError}>{errors.user}</Text>
            )}
            <View style={styles.inputLogin}>
              <Item rounded>
                <Input
                  placeholder='Contraseña'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
              </Item>
            </View>
            {errors && errors.password && (
              <Text style={styles.textError}>{errors.password}</Text>
            )}
            {errorMessages && (
              <Text style={styles.textError}>{errorMessages}</Text>
            )}
            <Button
              onPress={handleSubmit}
              style={styles.selectButton}>
              <Text style={styles.content}>INGRESAR</Text>
              {loading ? <Spinner color="#fff" style={{marginLeft: 15}}/> : null}
              
            </Button>
          </>
        )}
      </Formik>
    </ContainerApp>
  );
};

const styles = StyleSheet.create({
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
  textError: {
    color: 'red',
    marginLeft: 35,
    marginBottom: 5,
  },
  iconEstimate: {
    fontSize: 20,
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
    marginTop: 10,
    marginHorizontal: 25,
  },
  btnPrimary: {
    borderRadius: 15,
    backgroundColor: '#435f65',
    width: '70%',
    marginRight: 10,
    elevation: 0,
    alignSelf: 'center',
  },
  selectButton: {
    backgroundColor: '#435f65',
    borderRadius: 25,
    elevation: 1,
    width: '80%',
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '10%',
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
    color: 'white',
    fontSize: globalStyles.FONT_LABEL_SIZE,
    fontFamily: globalStyles.FONT_FAMILY,
  },
})

export default Login;