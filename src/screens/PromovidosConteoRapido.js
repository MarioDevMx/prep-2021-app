import React, {useState, useEffect, Fragment} from 'react';
import {Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import {
  Divider,
  DataTable,
} from 'react-native-paper';
import { Picker, Input, Thumbnail, Spinner, Button} from 'native-base';
import * as globalStyles from '../config/styles';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native'
import { getCasillas } from '../store/api/casillaApi';
import { getSecciones } from '../store/api/seccionApi';
import { 
  getConteoRapidoPromovidos,
  putConteoRapidoPromovidos,
  clearConteoRapidoPromovidos,
} from '../store/api/promovidosApi';

const PromovidosConteoRapido = ({navigation}) => {
  const userLogged = useSelector((state) => state.UserLogged);
  const Casillas = useSelector((state) => state.Casillas);
  const Secciones = useSelector((state) => state.Secciones);
  const Promovidos = useSelector((state) => state.Promovidos);
  const PromovidosUpdate = useSelector((state) => state.PromovidosUpdate);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [selectSeccion, setSelectSeccion] = useState(undefined);
  const [selectCasilla, setSelectCasilla] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [secciones, setSecciones] = useState([]);
  const [casillas, setCasillas] = useState([]);

  // const [votoGeneral, setVotoGeneral] = useState();
  // const [votoSeguro, setVotoSeguro] = useState();

  const goToNext = () => {
    dispatch(clearConteoRapidoPromovidos());
    navigation.navigate('IndexHome');
  };

  const sendPromovidosConteo = (typeVoto) => {
    if (selectSeccion && selectCasilla) {
      let votoGeneral = 0;
      let votoSeguro = 0;
      switch (typeVoto) {
        default:
        case 1:
          votoGeneral = 1;
          setLoading(true);
          break;
        case 2:
          votoSeguro = 1;
          setLoading2(true);
          break;
      }
      dispatch(putConteoRapidoPromovidos({
        item: {
          Idpromovido: Promovidos.length > 0 ? Promovidos[0].Idpromovido : null,
          Votos: votoGeneral,
          Voto_seguro: votoSeguro,
        },
        context: {
          setLoading,
          setLoading2,
        }
      }))
    }
  };

  const changeSeccion = (value) => {
    if (userLogged && selectSeccion && selectCasilla) {
      dispatch(clearConteoRapidoPromovidos());
      dispatch(getConteoRapidoPromovidos({
        item: {
          ideleccion: userLogged.Ideleccion,
          idseccion: value,
          idcasilla: selectCasilla,
        }
      }))
    }
  };

  const changeCasilla = (value) => {
    if (userLogged && selectSeccion && selectCasilla) {
      dispatch(clearConteoRapidoPromovidos());
      dispatch(getConteoRapidoPromovidos({
        item: {
          ideleccion: userLogged.Ideleccion,
          idseccion: selectSeccion,
          idcasilla: value,
        }
      }))
    }
  };

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
    setSelectCasilla(0)
    if (selectSeccion) {
      dispatch(getCasillas({
        item: {
          IdSeccion: selectSeccion,
        },
        context: {
          setCasillas,
        }
      }));
    }
  }, [selectSeccion]); 

  useEffect(() => {
    if (selectSeccion && selectCasilla) {
      dispatch(getConteoRapidoPromovidos({
        item: {
          ideleccion: userLogged.Ideleccion,
          idseccion: selectSeccion,
          idcasilla: selectCasilla,
        }
      }))
    }
    if (selectSeccion === 0 || selectCasilla === 0) {
      dispatch(clearConteoRapidoPromovidos());
    }
  }, [userLogged, selectSeccion, selectCasilla]);
  return (
    <View style={styles.container}>
      <Header menuBtn dark title='PROMOVIDOS CONTEO RÁPIDO' color="#34495e"/>
      <View style={styles.row}>
        <ImageBackground
          source={require('../assets/images/candidatos/amado.png')}
          source={
            userLogged.FotoEleccion
            ? {uri: 'data:image/*;base64,' + userLogged.FotoEleccion}
            : require('../assets/images/user-image.png')
          }
          style={styles.imageBackground}>
        </ImageBackground>
        <View>
          <Text style={styles.titleText}>
            {
              userLogged && userLogged.Candidato
              ? userLogged.Candidato
              : 'CANDIDATO'
            }
          </Text>
          <Text style={styles.text}>
          {
              userLogged && userLogged.Eleccion
              ? userLogged.Eleccion
              : 'ELECCION'
            }
          </Text>
          {/* <Text style={styles.subtitleText}>
            COATZACOALCOS
          </Text> */}
        </View>
      </View>
      <ScrollView>
        <View style={styles.body}>
          <View style={{alignItems: 'center', marginBottom: '5%'}}>
            <Text>SECCION</Text>
            <View style={styles.pickerInput}>
              <Picker
                note
                mode="dropdown"
                selectedValue={selectSeccion}
                style={{
                  height: 50,
                  width: '100%',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'black',
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectSeccion(itemValue);
                  changeSeccion(itemValue, selectSeccion);
                }}>
                <Picker.Item key={0} label="Selecciona una seccion" value={0} />
                {secciones && secciones.length > 0 ? (
                  secciones.map((item) => (
                    <Picker.Item
                      key={item.Idseccion}
                      label={`${item.Seccion}`}
                      value={item.Idseccion}
                    />
                  ))
                ) : (
                  null
                )}
              </Picker>
            </View>
          </View>
          <View style={{alignItems: 'center', marginBottom: '5%'}}>
            <Text>CASILLA</Text>
            <View style={styles.pickerInput}>
              <Picker
                note
                mode="dropdown"
                selectedValue={selectCasilla}
                style={{
                  height: 50,
                  width: '100%',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'black',
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectCasilla(itemValue);
                  changeCasilla(itemValue, selectCasilla);
                }}>
                <Picker.Item key={0}
                  label={casillas.length > 0 || casillas == [] ? 'Seleccione una casilla' : 'Seleccione una seccion primero'}
                  value={0} />
                {casillas && casillas.length > 0 ? (
                  casillas.map((item) => (
                    <Picker.Item
                      key={item.Idcasilla}
                      label={`${item.Casilla}`}
                      value={item.Idcasilla}
                    />
                  ))
                ) : (
                  null
                )}
              </Picker>
            </View>
          </View>
          {selectSeccion && selectCasilla ?
            (
              <View>
                <View style={styles.row2}>
                  <Button
                    style={styles.votoGeneralButton}
                    onPress={() => sendPromovidosConteo(1)}
                  >
                    <Text style={styles.textButtonVoto}>VOTO GENERAL</Text>
                    {loading ?
                      <Spinner
                        color="grey"
                        size={30}
                        style={{marginRight: 20}}
                      />
                    : null}
                  </Button>
                </View>
                <View style={styles.row2}>
                  <Thumbnail
                    source={
                      userLogged.FotoEleccion
                      ? {uri: 'data:image/*;base64,' + userLogged.FotoEleccion}
                      : require('../assets/images/user-image.png')
                    }
                  />
                </View>
                <View style={styles.row2}>
                  <Button
                    // mode="contained"
                    style={styles.votoSeguroButton}
                    color="#9d2224"
                    onPress={() => sendPromovidosConteo(2)}
                  >
                    <Text style={styles.textButtonVoto}>VOTO SEGURO</Text>
                    {loading2 ?
                      <Spinner
                        color="grey"
                        size={30}
                        style={{marginRight: 20}}
                      />
                    : null}
                  </Button>
                </View>
              </View>
            )
            :
            (
              null
            )
          }
          <Divider style={styles.divider} />
        </View>
        <View style={[styles.containerVotoGeneral]}>
          <DataTable.Row>
            <DataTable.Title>
              <Text style={styles.textConteo}>VOTO GENERAL</Text>
            </DataTable.Title>
              <View style={styles.input}>
              <Text style={styles.textConteoVal}>
                {Object.getOwnPropertyNames(PromovidosUpdate).length > 0 &&
                 selectSeccion && selectCasilla
                  ? PromovidosUpdate.substring(0,PromovidosUpdate.indexOf("|"))
                  : selectSeccion && selectCasilla && Promovidos.length > 0 ? Promovidos[0].Votos : null}
                </Text>
              </View>
          </DataTable.Row>
        </View>
        <View style={[styles.containerVotoSeguro]}>
          <DataTable.Row>
            <DataTable.Title>
              <Text style={styles.textConteo}>VOTO SEGURO</Text>
            </DataTable.Title>
              <View style={styles.input}>
                <Text style={styles.textConteoVal}>
                  {Object.getOwnPropertyNames(PromovidosUpdate).length > 0 &&
                    selectSeccion && selectCasilla
                    ? PromovidosUpdate.substring(PromovidosUpdate. indexOf('|') + 1)
                    : selectSeccion && selectCasilla && Promovidos.length > 0 ? Promovidos[0].Voto_seguro : null}
                </Text>
              </View>
          </DataTable.Row>
        </View>
        <View style={styles.body}>
          <Divider style={styles.divider} />
          <View style={styles.row2}>
            <Button
              style={styles.saveButton}
              onPress={() => goToNext()}
            >
              <Text style={styles.textButtonHome}>INICIO</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  imageCenter: {
    height: 50,
    width: 50,
    margin: 10,
    alignItems: 'center',
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
  pickerInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
  },
  votoGeneralButton: {
    width: '100%',
    borderColor: '#34495e',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffb562',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 1,
  },
  votoSeguroButton: {
    width: '100%',
    borderColor: '#34495e',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#9d2224',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 1,
  },
  saveButton: {
    width: '100%',
    borderColor: '#34495e',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#435f65',
  },
  input: {
    width: '50%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 4,
  },
  textConteo: {
    fontSize: 14,
    paddingEnd: 10,
    fontFamily: 'Montserrat-Bold',
    color: '#435f65',
    textAlign: 'center',
  },
  textButtonVoto: {
    fontSize: 14,
    width: '100%',
    fontFamily: 'Montserrat-Bold',
    color: '#435f65',
    textAlign: 'center',
    fontSize: 17,
  },
  textButtonHome: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    width: '100%',
    color: 'white',
    fontSize: 17,
  },
  textConteoVal: {
    fontSize: 14,
    paddingStart: 5,
    paddingTop: 10,
    fontFamily: 'Montserrat-Bold',
    color: '#435f65',
  },
  divider: {
    borderWidth: 0.7,
    borderColor: globalStyles.GRAY_COLOR,
    marginBottom: '4%',
    marginTop: '4%',
  },
  containerVotoGeneral: {
    backgroundColor: '#dcdcdc',
    paddingHorizontal: '0%',
  },
  containerVotoSeguro: {
    backgroundColor: '#c8d8dc',
    paddingHorizontal: '0%',
  },
})

export default PromovidosConteoRapido;