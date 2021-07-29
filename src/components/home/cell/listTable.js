import React, {Component} from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, Button} from 'react-native'
import * as Colors from '../../../styles/colors'
import { IconButton } from 'react-native-paper'

import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

class ListTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoveRoom: false,
            currentUser: null,
        }
    }
    async componentDidMount() {
        const { currentUser } = await firebase.auth()
        this.setState({ currentUser }) 
        const roomLoveRef = await firestore().collection('loveRooms')
        var snapshot = roomLoveRef.where('roomId', '==', this.props.room.key).where('user', '==', this.state.currentUser ? this.state.currentUser.email : "").onSnapshot(querySnapshot => {
            //console.log(`Received query snapshot of size ${querySnapshot.size}`);
            if(querySnapshot.size === 0){
                this.setState({isLoveRoom: false})
            } else {
                this.setState({isLoveRoom: true})
            }
        });
      }
    doLoveRoom = async () => {
        if(this.state.currentUser == null){
            return
        }
        const obj = {
            roomId: this.props.room.key,
            user: this.state.currentUser.email
        }

        const roomLoveRef = await firestore().collection('loveRooms')
        var snapshot = await roomLoveRef.where('roomId', '==', this.props.room.key);

       snapshot = await snapshot.where('user', '==', this.state.currentUser ? this.state.currentUser.email : "").get();
        if(snapshot.empty){
            roomLoveRef.add(obj).then(() => {
                console.log('Loved')
                this.setState({isLoveRoom: true})
            });
        } else {
            const batch = firestore().batch();
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref)
              });
             batch.commit().then(() => {
                console.log("Remove love")
                this.setState({isLoveRoom: false})
            });
        }
    }
    render(){
        return(
              <TouchableOpacity style={{flex: 1, margin: 5, flexDirection: 'row'}} onPress={()=> this.props.navigation.navigate('RoomDetails', {room: this.props.room})}>
                    <View style={{flex: 1, marginRight: 15}}>
                        <ImageBackground source={{uri: this.props.room.extension.listImageUrl[0]}} style={{height: 100, borderRadius: 0, width: '100%'}} imageStyle={{ borderRadius: 10 }}>
                        <IconButton
                            style={{position: 'absolute', right: 0}}
                            icon={this.state.isLoveRoom ? "heart" : "heart-outline"}
                            color={this.state.isLoveRoom ? "red": Colors.white}
                            size={20}
                            onPress={() => this.doLoveRoom()}
                        />
                        </ImageBackground>
                    </View>
                    <View style={{flex: 2, flexDirection: 'column', marginVertical: 10}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text numberOfLines={1} style={styles.type}>{this.props.room.info.typeRoom}</Text>
                            <Text style={styles.cost}>{this.props.room.info.giathue} VND/phòng</Text>
                        </View>
                        <Text numberOfLines={2} style={styles.title}>{this.props.room.confirm.title}</Text>
                        <Text numberOfLines={1} style={styles.address}>{this.props.room.address.nameNha}, {this.props.room.address.nameDuong}, {this.props.room.address.namePhuong}</Text>
                        <Text style={styles.address2}>{this.props.room.address.nameQuan}</Text>
                    </View>
                </TouchableOpacity>
        )   
    }
}
const styles = StyleSheet.create({
    type: {
        //fontFamily: "roboto-regular",
        fontSize: 12,
        color: Colors.grayLabel,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 15,
        //color: Colors.white,
        fontWeight: 'bold'
    },
    cost: {
        fontSize: 12,
        color: Colors.pink,
    },
    address:{
        fontSize: 12,
        color: Colors.grayLabel,
    },
     address2 : {
        fontSize: 12,
        color: Colors.grayLabel,
    }
})
export default ListTable;