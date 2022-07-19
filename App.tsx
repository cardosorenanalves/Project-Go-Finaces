
import React from 'react';
import AppLoading from 'expo-app-loading';
import { Dashboard } from './src/pages/Dashboard';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme'
import { Register } from './src/pages/Register';
import { CategorySelect } from './src/pages/CategorySelect';

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
     <Register/>
     </ThemeProvider>
     )
}

