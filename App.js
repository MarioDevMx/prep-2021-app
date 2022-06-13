import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import {DefaultTheme, configureFonts, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import configureStore from './src/store/configureStore';
import RootStack from './src/config/routes';

const store = configureStore()

const fontsConfig = {
  android: {
    bold: {
      fontFamily: 'Montserrat-Bold',
      fontWeight: 'normal'
    },
    regular: {
      fontFamily: 'Montserrat-Regular',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: 'Montserrat-Light',
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: 'Montserrat-Thin',
      fontWeight: 'normal'
    },
  }
}
const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontsConfig)
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <RootStack />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;