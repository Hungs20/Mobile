import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import * as Colors from '../../styles/colors'
export default class Loading extends React.Component {
    componentDidMount() {
  //     firebase.auth()
  // .signOut()
  // .then(() => console.log('User signed out!'));
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'Main' : 'Login')
        })
      }
    
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" color={Colors.pink} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})