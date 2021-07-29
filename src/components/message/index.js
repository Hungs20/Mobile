
import React, { Component } from 'react';
import {View, 
        Text, StyleSheet, 
        ImageBackground,
        StatusBar,
        Image,
        TouchableOpacity,
        Dimensions,
        FlatList,
        TextInput
    } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

class Message extends Component {
    constructor(props){
        super(props);
        this.state={
            searchValue: "",
            listMessage: null,
            currentUser: null,
            listMessage : [],
        }
        this.user = firebase.auth().currentUser;
        console.log("User:" + this.user.uid);
        this.chatRef = this.getRef().child("chatGroup/" + this.user.uid);
        this.chatRefData = this.chatRef.orderByChild("createAt");
    }
    getRef() {
        return firebase.database().ref();
      }
    
    componentDidMount() {
        this.chatRef.on("value", snap => {
            var items = [];
            snap.forEach(child => {
                items.push({
                    _id: child.val().createdAt,
                    user_id: child.key,
                    lastText: child.val().lastText ?? "",
                    isRead: child.val().isRead,
                    createdAt: new Date(child.val().createdAt).toString(),
                    user: child.val().user ?? {
                        photoURL: "",
                    }
                })
            })
            this.setState({
                listMessage: items
            })
        })
    }
    componentWillUnmount() {
        this.chatRefData.off();
      }
       timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }
    renderItem =({item}) => {
        return (
            <TouchableOpacity style = {styles.item_container} onPress={()=> this.props.navigation.navigate('ChatMessage', {authUser: item.user})}>
                {
                    item.user.photoURL ?
                    <Image 
                    source = {{uri: item.user.photoURL}}
                    style = {{width:50, height:50}}
                    resizeMode={"stretch"}
                /> : <Image 
                source = {require('../../data/defaultAva.jpg')}
                style = {{width:50, height:50}}
                resizeMode={"stretch"} />
                }
                <View style = {styles.item_message}>
                    <View style={{flex:1}}>
                        <Text
                        style={{
                            color: 'black',
                            fontWeight: item.isRead ? null : 'bold'
                        }}>
                            {item.user.displayName}
                        </Text>
                        <Text 
                        style={{
                            color: 'black',
                            fontSize:12,
                            fontWeight: item.isRead ? null : 'bold',
                            marginTop:3
                        }}>
                            {item.lastText.text ?? ""}
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={{
                            color: 'black',
                            fontSize: 12,
                            fontStyle: 'italic',
                            fontWeight: item.isRead ? null : 'bold',
                            textAlign: 'right'
                        }}>
                            {this.timeSince(new Date(item.createdAt))
                            }
                        </Text>
                        {item.isRead ? null : 
                            <View style={styles.num_readed}>  
                                <Text style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 12
                                }}>
                                   {item.isRead > 5 ? "5+" : item.isRead}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    ItemSeparatorComponent = () => {
        return (
            <View style = {{
                height: 1,
                paddingVertical: 10
            }}/>
        )
    }

    render(){
        console.log(this.state.listMessage)
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                { <View style={styles.header}>
                    <View style={{height: '65%'}}>
                        <ImageBackground
                        source={require("../../data/img/header_message.png")}
                        style={styles.imgBackground}
                        resizeMode={"stretch"}>
                            <View style={styles.ImageBackground_container}>
                                <View style= {styles.logo}>
                                    <Image
                                        source={require("../../data/img/logotest.png")}
                                        style = {{width:80, height: 80}}
                                    />
                                </View>
                                <View style={styles.user}>
                                    <Text numberOfLines={1}
                                        style={styles.user_name}>INBOX</Text>
                                    <View style={styles.action}>
                                        <TouchableOpacity style={styles.icon}>
                                            <AntDesign name = "scan1" color ="white" 
                                            size = {20} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.icon}>
                                            <FontAwesome name = "photo" color ="white" 
                                            size = {20} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.icon}>
                                            <FontAwesome name = "camera" color ="white" 
                                            size = {20} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.icon}>
                                            <Entypo name = "log-out" color ="white" 
                                            size = {20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.selection}>
                        <View style = {styles.searchBar}>
                            <Ionicons name = "ios-search" color = "gray" size={20} />
                            <TextInput 
                                style ={styles.textInput} 
                                placeholder = "Search..."
                                value={this.state.searchValue}
                                onChangeText = {text => this.setState({searchValue: text})}
                            />
                            <TouchableOpacity onPress={()=> this.setState({searchValue: ""})}>
                                <Ionicons name = "ios-close" color = "gray" size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> }
                <View style={styles.footer}>
                    <FlatList 
                        data = {this.state.listMessage}
                        renderItem = {this.renderItem}
                        keyExtractor = {(item) => item._id}
                        ItemSeparatorComponent = {this.ItemSeparatorComponent}
                    />
                </View>
            </View>
        )
    }
}

const {width} = Dimensions.get("window");
const width_searchBar = width * 0.8;

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white'
    },
    header: {
        height: '35%'
    },
    footer: {
        height: '65%'
    },
    imgBackground: {
        flex:1,
        width: '100%',
        height: '100%'
    },
    ImageBackground_container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '8%'
    },
    logo:{
        flex: 1,
        marginLeft: '1%',
        alignItems: 'center'
    },
    user: {
        flex: 2,
        alignItems: 'center'
    },
    user_name:{
        color: 'yellow',
        fontWeight: 'bold',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 5
    },
    icon:{
        marginRight: 10
    },
    item_container: {
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    item_message: {
        flex:1,
        flexDirection: 'row',
        paddingLeft: 15,
        borderBottomWidth:1,
        borderBottomColor: '#f2f2f2'
    },
    num_readed: {
        height: 20,
        backgroundColor: 'red',
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:50,
        marginTop:3
    },
    selection: {
        height: '35%',
        alignItems: 'center'
    },
    searchBar:{
        width: width_searchBar,
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        marginTop: 15,
        borderRadius: 50,
        alignItems: 'center',
        paddingHorizontal: 15
    },
    textInput:{
        flex: 1,
        paddingHorizontal: 10
    }

});
export default Message;