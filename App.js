import React from 'react';
import { StyleSheet, Platform, Image, View  } from 'react-native';
import {Colors, Fonts} from './src/styles';
import { Button, ThemeProvider, Text } from 'react-native-elements';
import Tabbar from './src/components/tabbar'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import the different screens
import Loading from './src/components/auth/loading'
import SignUp from './src/components/auth/signup'
import Login from './src/components/auth/login'
import Main from './src/components/tabbar'


const App = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      Login,
      Main
    },
    {
      initialRouteName: 'Loading'
    }
  )
);


export default App