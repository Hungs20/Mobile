import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TextInput
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth'
import '@react-native-firebase/database';
var name, uid, email;
var userOther;
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.user = firebase.auth().currentUser;
    console.log("User:" + this.user.uid);

    const params = this.props.authUser;
    console.log(params)
    uid = params.uid;
    name = params.name;
    email = params.email;
    userOther = params;
    console.log("User:" + uid);

    this.chatRef = this.getRef().child("chat/" + this.generateChatId());
    this.chatRefData = this.chatRef.orderByChild("order");
    this.onSend = this.onSend.bind(this);

    this.chatGroupRef = this.getRef().child("chatGroup/" + this.user.uid + "/" + uid);
    this.chatGroupOtherRef = this.getRef().child("chatGroup/" + uid + "/" + this.user.uid);
  }

  //generate ChatId works cause when you are the user sending chat you take user.uid and your friend takes uid
  // when your friend is using the app to send message s/he takes user.uid and you take the uid cause you are the friend 

  generateChatId() {
    if (this.user.uid > uid) return `${this.user.uid}-${uid}`;
    else return `${uid}-${this.user.uid}`;
  }

  getRef() {
    return firebase.database().ref();
  }

  listenForItems(chatRef) {
    chatRef.on("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
        //var name = child.val().uid == this.user.uid ? this.user.name : name1;
        items.push({
          _id: child.val().createdAt,
          text: child.val().text,
          createdAt: new Date(child.val().createdAt),
          user: {
            _id: child.val().uid
            //avatar: avatar
          }
        });
      });
       this.chatGroupRef.update({
        isRead: 0
      });
      this.setState({
        loading: false,
        messages: items
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.chatRefData);
  }

  componentWillUnmount() {
    this.chatRefData.off();
  }

  async onSend(messages = []) {
    // this.setState({
    //     messages: GiftedChat.append(this.state.messages, messages),
    // });
    messages.forEach(async message => {
      //var message = message[0];
      var now = new Date().getTime();
      await this.chatRef.push({
        _id: now,
        text: message.text,
        createdAt: now,
        uid: this.user.uid,
        fuid: uid,
        order: -1 * now
      });
      await this.chatGroupRef.update({
        isRead: firebase.database.ServerValue.increment(1),
        lastText: message,
        createdAt: now,
        user: userOther
      });
      await this.chatGroupOtherRef.update({
        isRead: firebase.database.ServerValue.increment(1),
        lastText: message,
        createdAt: now,
        user: {
          displayName : this.user.displayName,
          email: this.user.email,
          photoURL: this.user.photoURL,
          uid: this.user.uid
        }
      });
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend.bind(this)}
        user={{
          _id: this.user.uid
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    marginRight: 10,
    marginLeft: 10
  }
});
