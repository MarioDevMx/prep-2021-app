import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button, IconButton } from 'react-native-paper';
import {AwesomeIcon} from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { savePhoto } from '../store/api/cameraApi';
import Header from './Header';

const Camera = (props) => {
  const [pausePreview, setPausePreview] = useState(false);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();

  const takePicture = async (camera) => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    const source = data;
    if (source) {
      await camera.pausePreview();
      setPhoto(source);
      setPausePreview(true);
    }
  }

  const resumePicture = async (camera) => {
    await camera.resumePreview();
    setPausePreview(false);
  }

  const savePicture = () => {
    dispatch(savePhoto(photo));
    props.navigation.goBack();
  }

  return (
    <View style={styles.main}>
      <Header backBtn title="Captura de foto" color="#34495e" dark/>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permiso para utilizar la camara',
          message: 'Se necesitan permisos para utilizar la camara',
          buttonPositive: 'Aceptar',
          buttonNegative: 'Cancelar',
        }}
        captureAudio={false}
      >
        {({camera, status}) => (
          pausePreview ? (
            <View style={styles.buttonsRow}>
              <Button
                mode="contained"
                color="#fff"
                onPress={() => resumePicture(camera)}
              >
                <Text>Cancelar</Text>
              </Button>
              <Button
                style={{marginLeft: 25}}
                mode="contained"
                color="#3498db"
                onPress={() => savePicture(camera)}
              >
                <Text style={{color: '#fff'}}>Aceptar</Text>
              </Button>
            </View>
          ) : (
            <View style={styles.snapButton}>
              <IconButton
                color="#fff"
                icon='camera'
                size={60}
                onPress={() => takePicture(camera)}
              />
            </View>
          )
        )}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  snapButton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonsRow: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
})

export default Camera;