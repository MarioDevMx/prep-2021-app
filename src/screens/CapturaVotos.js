import React, {useState, useEffect, useLayoutEffect, Fragment} from 'react';
import {Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import ContainerApp from '../components/ContainerApp.js';
import {
  Button,
} from 'react-native-paper';
import { Picker, Input, Spinner} from 'native-base';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as globalStyles from '../config/styles';
import { useDispatch, useSelector } from 'react-redux';
import {useIsFocused} from '@react-navigation/native'
import { getSecciones } from '../store/api/seccionApi';
import { getCasillas } from '../store/api/casillaApi';
import { getRegistrosPrep, saveCapturaVotos } from '../store/api/conteoRapidoApi';
import { Formik } from 'formik';
import * as yup from 'yup';
import { clearPhoto } from '../store/api/cameraApi';

const positiveRule = 'El numero debe ser positivo'
const integerRule = 'El numero no debe contener puntos decimales'

const CapturaVotos = ({navigation}) => {
  const [secciones, setSecciones] = useState([]);
  const [casillas, setCasillas] = useState([]);
  const [selectedSeccion, setSelectedSeccion] = useState(null);
  const [selectedCasilla, setSelectedCasilla] = useState(null);
  const [partidosActive, setPartidosActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [totalVotos, setTotalVotos] = useState(0);
  const [registrosPrep, setRegistrosPrep] = useState(null);
  const [errorMessages, setErrorMessages] = useState(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.UserLogged);
  const photo = useSelector((state) => state.Camera);

  useEffect(() => {
    if (isFocused) {
      const eleccion = userLogged.Eleccion
      dispatch(getSecciones({
        item: userLogged,
        context: {
          setSecciones,
        }
      }))
    }
  }, [isFocused])
  
  useEffect(() => {
    setCasillas([])
    setSelectedCasilla(0)
    if (selectedSeccion) {
      dispatch(getCasillas({
        item: {
          IdSeccion: selectedSeccion,
        },
        context: {
          setCasillas,
        }
      }));
    }
  }, [selectedSeccion]);

  useLayoutEffect(() => {
    if (selectedCasilla && selectedSeccion) {
      dispatch(getRegistrosPrep({
        item: {
          idEleccion: userLogged.Ideleccion,
          idSeccion: selectedSeccion,
          idCasilla: selectedCasilla,
        },
        context: {
          setRegistrosPrep,
        }
      }))
      setLoading(true);
    }
    setPartidosActive(false);
  }, [selectedSeccion, selectedCasilla])

  useLayoutEffect(() => {
    if (registrosPrep) {
      setPartidosActive(true);
      setLoading(false);
      dispatch(clearPhoto());
    }
  }, [registrosPrep]);

  useLayoutEffect(() => {
    if (photo.base64) {
      setErrorMessages(null);
    }
  }, [photo]);

  const sendData = (values) => {
    if (!photo.base64) {
      setErrorMessages({photo: 'La foto de la sabana es obligatoria.'})
      return
    }
    const payload = {
      Pan: values.votos_pan,
      Pri: values.votos_pri,
      Prd: values.votos_prd,
      Alianzapri: values.votos_panprdpri,
      Verde: values.votos_pvem,
      Pr: values.votos_pt,
      Morena: values.votos_morena,
      Alianzamorena: values.votos_morverpt,
      Mc: values.votos_mc,
      Tvet: values.votos_todosxver,
      Podemos: values.votos_podemos,
      Cardenista: values.votos_carden,
      Pes: values.votos_pes,
      Rspredes: values.votos_rsp,
      Fmex: values.votos_fuerzamex,
      Independiente: values.votos_cindep,
      Nulos: values.votos_nulos,
      Sabana: photo.base64,
      Idcasilla: registrosPrep.Idcasilla,
      Idconteo: registrosPrep.Idconteo,
      Ideleccion: registrosPrep.Ideleccion,
      Idseccion: registrosPrep.Idseccion,
      Unidadc: registrosPrep.Unidadc,
    };
    console.log(payload);
    setLoadingBtn(true);
    dispatch(saveCapturaVotos({
      item: payload,
      context: {
        setLoadingBtn,
      }
    }))
  };

  const sumTotal = (values) => {
    let total = 0;
    const list = Object.getOwnPropertyNames(values);
    list.map((prop) => {
      const val = values[prop] === '' ? 0 : values[prop]
      total = total + parseInt(val)
    })
    return total
  };

  return (
    <View style={styles.container}>
      <Header menuBtn dark title='CAPTURA DE VOTOS' color="#34495e"/>
      <View style={styles.row}>
        <ImageBackground
          source={
            userLogged.FotoEleccion ? {uri: 'data:image/*;base64,' + userLogged.FotoEleccion} : require('../assets/images/banner.jpeg')
          }
          style={styles.imageBackground}>
        </ImageBackground>
        <View>
          <Text style={styles.titleText}>
            {userLogged.Candidato}
          </Text>
          <Text style={styles.text}>
            {userLogged.Eleccion ? userLogged.Eleccion.split(' - ')[0] : ''}
          </Text>
          <Text style={styles.subtitleText}>
            {userLogged.Eleccion ? userLogged.Eleccion.split(' - ')[1] : ''}
          </Text>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View style={{alignItems: 'center', marginBottom: '5%'}}>
          <Text>SECCION</Text>
          <View style={styles.pickerInput}>
            <Picker
              note
              mode="dropdown"
              selectedValue={selectedSeccion}
              onValueChange={(value) => setSelectedSeccion(value)}
            >
              <Picker.Item label="Seleccione una seccion" value={0} />
              {secciones.length > 0 ? 
                secciones.map((item) =>
                  <Picker.Item key={item.Idseccion} label={`${item.Seccion}`} value={item.Idseccion} />
                )
              : null}
            </Picker>
          </View>
        </View>
        <View style={{alignItems: 'center', marginBottom: '5%'}}>
          <Text>CASILLA</Text>
          <View style={styles.pickerInput}>
            <Picker
              note
              mode="dropdown"
              selectedValue={selectedCasilla}
              onValueChange={(value) => setSelectedCasilla(value)}
            >
              <Picker.Item
                label={casillas.length > 0 ? 'Seleccione una casilla' : 'Seleccione una seccion primero'}
                value={0} />
              {casillas.length > 0 ? 
                casillas.map((item) =>
                  <Picker.Item key={item.Idcasilla} label={`${item.Casilla}`} value={item.Idcasilla} />
                )
              : null}
            </Picker>
          </View>
        </View>
        {partidosActive ? (
          <Formik
            initialValues={{
              votos_pan: `${registrosPrep.Pan}`,
              votos_pri: `${registrosPrep.Pri}`,
              votos_prd: `${registrosPrep.Prd}`,
              votos_panprdpri: `${registrosPrep.Alianzapri}`,
              votos_pvem: `${registrosPrep.Verde}`,
              votos_pt: `${registrosPrep.Pt}`,
              votos_morena: `${registrosPrep.Morena}`,
              votos_morverpt: `${registrosPrep.Alianzamorena}`,
              votos_mc: `${registrosPrep.Mc}`,
              votos_todosxver: `${registrosPrep.Tver}`,
              votos_podemos: `${registrosPrep.Podemos}`,
              votos_carden: `${registrosPrep.Cardenista}`,
              votos_pes: `${registrosPrep.Pes}`,
              votos_rsp: `${registrosPrep.Rspredes}`,
              votos_fuerzamex: `${registrosPrep.Fmex}`,
              votos_cindep: `${registrosPrep.Independiente}`,
              votos_nulos: `${registrosPrep.Nulos}`,
            }}
            onSubmit={(values) => sendData(values)}
            validationSchema={yup.object().shape({
              votos_pan: yup.number().integer(integerRule).min(0, positiveRule),
              votos_pri: yup.number().integer(integerRule).min(0, positiveRule),
              votos_prd: yup.number().integer(integerRule).min(0, positiveRule),
              votos_panprdpri: yup.number().integer(integerRule).min(0, positiveRule),
              votos_pvem: yup.number().integer(integerRule).min(0, positiveRule),
              votos_pt: yup.number().integer(integerRule).min(0, positiveRule),
              votos_morena: yup.number().integer(integerRule).min(0, positiveRule),
              votos_morverpt: yup.number().integer(integerRule).min(0, positiveRule),
              votos_mc: yup.number().integer(integerRule).min(0, positiveRule),
              votos_todosxver: yup.number().integer(integerRule).min(0, positiveRule),
              votos_podemos: yup.number().integer(integerRule).min(0, positiveRule),
              votos_carden: yup.number().integer(integerRule).min(0, positiveRule),
              votos_pes: yup.number().integer(integerRule).min(0, positiveRule),
              votos_rsp: yup.number().integer(integerRule).min(0, positiveRule),
              votos_fuerzamex: yup.number().integer(integerRule).min(0, positiveRule),
              votos_cindep: yup.number().integer(integerRule).min(0, positiveRule),
              votos_nulos: yup.number().integer(integerRule).min(0, positiveRule),
            })}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              handleSubmit
            }) => (
              <>
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/PAN.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_pan} onChangeText={handleChange('votos_pan')} onBlur={handleBlur('votos_pan')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_pan && (<Text style={styles.errorText}>{errors.votos_pan}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/PRI.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_pri} onChangeText={handleChange('votos_pri')} onBlur={handleBlur('votos_pri')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_pri && (<Text style={styles.errorText}>{errors.votos_pri}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/PRD.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_prd} onChangeText={handleChange('votos_prd')} onBlur={handleBlur('votos_prd')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_prd && (<Text style={styles.errorText}>{errors.votos_prd}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/alianzaPanPrdPri.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_panprdpri} onChangeText={handleChange('votos_panprdpri')} onBlur={handleBlur('votos_panprdpri')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_panprdpri && (<Text style={styles.errorText}>{errors.votos_panprdpri}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/PVEM.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_pvem} onChangeText={handleChange('votos_pvem')} onBlur={handleBlur('votos_pvem')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_pvem && (<Text style={styles.errorText}>{errors.votos_pvem}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/PT.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_pt} onChangeText={handleChange('votos_pt')} onBlur={handleBlur('votos_pt')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_pt && (<Text style={styles.errorText}>{errors.votos_pt}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/Morena.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_morena} onChangeText={handleChange('votos_morena')} onBlur={handleBlur('votos_morena')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_morena && (<Text style={styles.errorText}>{errors.votos_morena}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/alianzamorenaverdept.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_morverpt} onChangeText={handleChange('votos_morverpt')} onBlur={handleBlur('votos_morverpt')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_morverpt && (<Text style={styles.errorText}>{errors.votos_morverpt}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/MC.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_mc} onChangeText={handleChange('votos_mc')} onBlur={handleBlur('votos_mc')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_mc && (<Text style={styles.errorText}>{errors.votos_mc}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/todosporvieracruz.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_todosxver} onChangeText={handleChange('votos_todosxver')} onBlur={handleBlur('votos_todosxver')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_todosxver && (<Text style={styles.errorText}>{errors.votos_todosxver}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/podemos.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_podemos} onChangeText={handleChange('votos_podemos')} onBlur={handleBlur('votos_podemos')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_podemos && (<Text style={styles.errorText}>{errors.votos_podemos}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/partidocardenista.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_carden} onChangeText={handleChange('votos_carden')} onBlur={handleBlur('votos_carden')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_carden && (<Text style={styles.errorText}>{errors.votos_carden}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/PES.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_pes} onChangeText={handleChange('votos_pes')} onBlur={handleBlur('votos_pes')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_pes && (<Text style={styles.errorText}>{errors.votos_pes}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/RSP.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_rsp} onChangeText={handleChange('votos_rsp')} onBlur={handleBlur('votos_rsp')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_rsp && (<Text style={styles.errorText}>{errors.votos_rsp}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/fuerzapormexico.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_fuerzamex} onChangeText={handleChange('votos_fuerzamex')} onBlur={handleBlur('votos_fuerzamex')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_fuerzamex && (<Text style={styles.errorText}>{errors.votos_fuerzamex}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/CIndependiente.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_cindep} onChangeText={handleChange('votos_cindep')} onBlur={handleBlur('votos_cindep')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_cindep && (<Text style={styles.errorText}>{errors.votos_cindep}</Text>)}
                <View style={styles.formRow}>
                  <Image
                    source={require('../assets/images/logospartidos/votosnulos.png')}
                    style={styles.imageBackground}>
                  </Image>
                  <View style={styles.input}>
                    <Input value={values.votos_nulos} onChangeText={handleChange('votos_nulos')} onBlur={handleBlur('votos_nulos')} keyboardType="numeric"/>
                  </View>
                </View>
                {errors && errors.votos_nulos && (<Text style={styles.errorText}>{errors.votos_nulos}</Text>)}
                <View style={styles.col}>
                  <Text style={styles.labelConteo}>TOTAL DE VOTOS EN CASILLA</Text>
                  <View style={styles.conteoBox}>
                    <Text style={styles.conteoText}>{
                      sumTotal(values)
                    }</Text>
                  </View>
                </View>
                <View style={styles.row2}>
                  <Button
                    mode="outlined"
                    style={styles.cameraButton}
                    color="#34495e"
                    onPress={() => navigation.navigate('CapturaCamara')}
                  >
                    <AwesomeIcon name="camera" size={20}/>
                    <Text>&nbsp;&nbsp;Foto de Sabana&nbsp;&nbsp;</Text>
                    {photo.base64 ? <AwesomeIcon name="check-circle" size={20}/> : null}
                  </Button>
                {errorMessages && errorMessages.photo && (<Text style={styles.errorText2}>{errorMessages.photo}</Text>)}
                </View>
                <View style={styles.row2}>
                  <Button
                    mode="contained"
                    style={styles.saveButton}
                    color="#34495e"
                    onPress={handleSubmit}
                    loading={loadingBtn}
                    >
                    <Text>Actualizar</Text>
                  </Button>
                </View>
              </>
            )}
          </Formik>
        ) : null}
        {loading ? <Spinner style={{marginTop: 80}} size={50} color="grey" /> : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rowIcon: {
    marginRight: '5%',
  },
  formRow: {
    // marginBottom: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    marginBottom: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    marginBottom: '5%',
    // flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: '5%',
  },
  imageBackground: {
    height: 50,
    width: 50,
    margin: 10,
  },
  titleText: {
    fontFamily: globalStyles.FONT_FAMILY_SEMIBOLD,
    fontSize: 15,
    color: '#435f65',
  },
  text: {
    fontFamily: globalStyles.FONT_FAMILY_SEMIBOLD,
    fontSize: 13,
    color: '#435f65',
  },
  subtitleText: {
    fontFamily: globalStyles.FONT_FAMILY_SEMIBOLD,
    fontSize: 14,
    color: '#7d7d7d',
  },
  labelText: {
    fontFamily: globalStyles.FONT_FAMILY_SEMIBOLD,
    fontSize: globalStyles.FONT_LABEL_SIZE,
    marginBottom: '3%',
  },
  iconEstimate: {
    fontSize: 20,
    color: '#475057',
  },
  inputLogin: {
    marginBottom: 10,
    // marginEnd: 25,
    // marginStart: 25,
    width: '100%',
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
  thumbnail: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: '10%',
    marginBottom: '1%',
  },
  pickerInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    // borderColor: 'red',
  },
  input: {
    width: '78%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    // borderColor: 'red',
  },
  cameraButton: {
    width: '100%',
    borderColor: '#34495e',
    borderWidth: 1,
    borderRadius: 10,
  },
  saveButton: {
    width: '100%',
    borderColor: '#34495e',
    borderWidth: 1,
    borderRadius: 20,
  },
  labelConteo: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#34495e',
  },
  conteoText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
    color: '#34495e',
  },
  conteoBox: {
    borderColor: '#34495e',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 60,
    paddingVertical: 5,
    backgroundColor: '#ecf0f1'
  },
  col: {
    marginVertical: 10,
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    marginLeft: '20%'
  },
  errorText2: {
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    marginLeft: '10%',
  }
})

export default CapturaVotos;