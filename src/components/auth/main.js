import React from 'react'
import {View, Image, StyleSheet, SafeAreaView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ListItem, Button, Text, CheckBox, Divider, ThemeProvider, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import Tabbar from '../tabbar'
export default class Main extends React.Component {
  state = { currentUser: null }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}
render() {
    const { currentUser } = this.state
return (
      <View style={styles.container}>
        <Tabbar/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})