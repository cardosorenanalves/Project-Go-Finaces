
import React from 'react';
import AppLoading from 'expo-app-loading';
import 'react-native-gesture-handler'
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import {NavigationContainer} from '@react-navigation/native'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { ThemeProvider,} from 'styled-components';
import theme from './src/global/styles/theme'
import { AppRoutes } from './src/routes/appRoutes';
import { StatusBar } from 'react-native';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });
  if(!fontsLoaded){
    return <AppLoading />
  }
  return(
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
        backgroundColor="transparent"
         barStyle='light-content'
         translucent/>
        <AppRoutes/>
      </NavigationContainer>   
     </ThemeProvider>
     )
}

