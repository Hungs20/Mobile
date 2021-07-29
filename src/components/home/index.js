import React, { Component} from 'react'
import {View, Image, StyleSheet, SafeAreaView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ListItem, Button, Text, CheckBox, Divider, ThemeProvider, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import * as Colors from '../../styles/colors'
import Search from '../search/search'
import { FlatGrid } from 'react-native-super-grid';
import { SectionGrid } from 'react-native-super-grid';
import Trend from './trend'
import HotRoom from './hotRoom'
import NewRoom from './newRoom'
import MoreRoom from './moreRoom'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: null,

        }
    }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }
    render(){
        const { currentUser } = this.state
        return (
            <ThemeProvider style={{flex: 1}}>
            <ScrollView>
                <Search navigation={this.props.navigation}/>
                <View style={styles.container}>
                    <Trend navigation={this.props.navigation}/>
                    <HotRoom navigation={this.props.navigation}/>
                    
                    <NewRoom navigation={this.props.navigation}/>
                    <MoreRoom navigation={this.props.navigation}/>
                </View>
            </ScrollView>
            </ThemeProvider>
        )
    }
}
const styles = StyleSheet.create({
    container : {
        marginHorizontal: 10, flex: 1
    },
    
  });
export default Home;