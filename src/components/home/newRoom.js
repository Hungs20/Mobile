import React, {Component} from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import * as Colors from '../../styles/colors'
import ListTable from './cell/listTable'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

class NewRoom extends Component {
    constructor(props){
        super(props)
        this.state = {
            listRoom : []
        }
    }
    _isMounted = false;
    componentDidMount() {
        this._isMounted = true;
        var d = new Date()
        const subscriber = firestore()
        .collection('rooms').orderBy('date_create', "desc").limitToLast(10)
        .onSnapshot(querySnapshot => {
        const rooms = [];

        querySnapshot.forEach(documentSnapshot => {
            rooms.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
            });
        });
        if (this._isMounted) {
            this.setState({listRoom: rooms})
          }
        
        });

    // Unsubscribe from events when no longer in use
    () => subscriber();

    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    render(){
        return(
            <View style={{flex:1}}>
                <Text style={styles.title}>Phòng mới</Text>
                <View style={{flex: 1, flexDirection: 'column'}}> 
                {
                    this.state.listRoom.map((room, index) => (
                        <ListTable key={room.key} room={room} navigation={this.props.navigation}/>
                    ))
                }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    image: {
        flex:1, borderRadius: 10, margin: 5, height: 100, width: '100%'
    },
    title : {
        //fontFamily: "roboto-regular",
        fontSize: 14,
        color: 'black', 
        fontWeight:'bold',
        paddingVertical: 10,
        paddingLeft: 10
    },
  })
export default NewRoom;