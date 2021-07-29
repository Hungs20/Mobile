import React, { Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import * as Colors from '../../styles/colors'
import CellLoveRoom from './cellLoveRoom'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { View, Text } from 'react-native'
import { ThemeProvider } from 'react-native-elements'
class LoveRoom extends Component {
    constructor(props){
        super(props)
        this.state={
            currentUser: null,
            listRoom: [],
        }
    }
    _isMounted = false;
    async componentDidMount() {
        const {currentUser} = await firebase.auth()
        await this.setState({ currentUser })
         this._isMounted = true;
        const subscriber = firestore()
        .collection('loveRooms').where('user', '==',this.state.currentUser ? this.state.currentUser.email : null)
        .onSnapshot( querySnapshot => {
        const rooms = [];

         querySnapshot.forEach( documentSnapshot => {
            const roomLove =  documentSnapshot.data();
            const roomQuery =  firestore().collection('rooms').doc(roomLove.roomId);
            const roomObj =  roomQuery.onSnapshot( docSnapshot => {
                 rooms.push({
                ...docSnapshot.data(),
                key: docSnapshot.id,
                });
                //console.log(rooms)
                if (this._isMounted) {
            
                     this.setState({listRoom: rooms})
                  }
              }, err => {
                console.log(`Encountered error: ${err}`);
              })
        });
        });

    // Unsubscribe from events when no longer in use
     () => subscriber();

    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        return(
            <ThemeProvider style={{flex: 1}}>
                <View style={{backgroundColor: 'white', height: 60}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center',textAlignVertical: 'center', paddingVertical: 10}}>Yêu thích</Text>
                </View>
                <ScrollView style={{marginHorizontal: 10}}>
                {
                    this.state.listRoom.map((room, index) => {
                        return (
                           <CellLoveRoom key={this.state.listRoom[index].key} height={200} room={room} navigation={this.props.navigation}/> 
                        )
                    })
                    }  
                </ScrollView>
            </ThemeProvider>
        )
    }
}
export default LoveRoom;