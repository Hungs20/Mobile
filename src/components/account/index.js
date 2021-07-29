import React, { Component, useEffect  } from 'react'
import {View, Text, AppRegistry } from 'react-native'
import { ListItem, Avatar, FlatList, Icon } from 'react-native-elements'
import * as Colors from '../../styles/colors' 
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';


class Account extends Component {
    constructor(props){
        super(props)
        this.state = { currentUser: null, data: [] }
        
    }
    
   async componentDidMount() {
    const { currentUser } = await firebase.auth()

    await this.setState({ currentUser })
    console.log(this.state.currentUser)
    const subscriber = firestore()
    .collection('users').where('uid','==', currentUser.uid)
    .onSnapshot(querySnapshot => {
      const users = [];

      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      this.setState({data: users})
    });

  // Unsubscribe from events when no longer in use
   () => subscriber();

    
  }

    keyExtractor = (item, index) => index.toString()

renderItem = ({ item }) => (
  <ListItem bottomDivider>
    <Avatar source={{uri: item.avatar_url}} />
    <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
      <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
)

logout = () => {
  firebase.auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}

    render(){
        return (
        <View>
            <View style={{backgroundColor: 'white', height: 60}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center',textAlignVertical: 'center', paddingVertical: 10}}>Tài khoản</Text>
            </View>
            <ListItem bottomDivider containerStyle={{backgroundColor: Colors.grayBackground}}>
                <Avatar rounded size="medium" source={{uri: this.state.currentUser && this.state.currentUser.photoURL}} />
                <ListItem.Content>
                <ListItem.Title style={{fontWeight: 'bold'}}>{this.state.currentUser && this.state.currentUser.displayName}</ListItem.Title>
                
            {this.state.data.map((item, i) => (<ListItem.Subtitle>{item.location}</ListItem.Subtitle>
          ))}
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        {this.state.data.map((item, i) => (
            <ListItem key={i} bottomDivider  containerStyle={{backgroundColor: Colors.grayBackground}}>
                <ListItem.Content>
                <ListItem.Title>Ngôn ngữ</ListItem.Title>
                
                </ListItem.Content>
                
                <Text style={{textAlign:'right', width:100}}>{item.language}</Text>
                <ListItem.Chevron />
            </ListItem>
        ))}

        {this.state.data.map((item, i) => (
            <ListItem key={i} bottomDivider  containerStyle={{backgroundColor: Colors.grayBackground}} onPress={()=>console.log('tiente')}>
                <ListItem.Content>
                <ListItem.Title>Tiền tệ</ListItem.Title>
                
                </ListItem.Content>
                
                <Text style={{textAlign:'right', width:100}}>{item.unitMoney}</Text>
                <ListItem.Chevron />
            </ListItem>
        ))}

          <ListItem bottomDivider  containerStyle={{backgroundColor: Colors.grayBackground}} onPress={()=>this.logout()}>
                <ListItem.Content>
                <ListItem.Title>Thoát tài khoản</ListItem.Title>
                
                </ListItem.Content>
                
                <ListItem.Chevron />
            </ListItem>

        </View>
        )
    }
}
export default Account;