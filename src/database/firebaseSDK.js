import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth'
import '@react-native-firebase/database';
class FirebaseSDK {
    uid = "";
  messagesRef = null;
  conversationRef = null;
  // initialize Firebase Backend
	constructor() {
		if (!firebase.apps.length) {
			firebase.initializeApp({
				apiKey: "AIzaSyBBWOW9RUgHEimulQWfUTuByV-Zqmn0mzw",
                authDomain: "hungs20.firebaseapp.com",
                databaseURL: "hungs20.firebaseio.com",
                projectId: "hungs20",
                storageBucket: "hungs20.appspot.com",
                messagingSenderId: "000000000000000",
			});
		}
	firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setUid(user.uid);
        } else {
          firebase
            .auth()
            .signInAnonymously()
            .catch(error => {
              alert(error.message);
            });
        }
      });
    }
    setUid(value) {
      this.uid = value;
    }
    getUid() {
      return this.uid;
    }
    // retrieve the messages from the Backend
    loadMessages(callback) {
      this.messagesRef = firebase.database().ref("messages/1");
      this.messagesRef.off(); //Detaches a callback previously attached with on()
      const onReceive = data => {
        const message = data.val();
        console.log(message._id)
        callback({
          _id: data.key,
          text: message.text,
          //createdAt: new Date(message.createdAt),
          createdAt: message.createdAt,
          user: {
            _id: message.user._id,
            name: message.user.name
          }
        });
      };
  
      var d = this.getLimit();
      console.log(d);
      //Generates a new Query object limited to the last specific number of children.
      //this.messagesRef.limitToLast(10).on("child_added", onReceive);
      this.messagesRef
        .orderByChild("createdAt")
        //.startAt(d)
        //.endAt("2017-11-27T06:51:47.851Z")
        .on("child_added", onReceive);
    }
    // send the message to the Backend
    sendMessage(message) {
      //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
      var today = new Date();
      /* today.setDate(today.getDate() - 30);
      var timestamp = new Date(today).toISOString(); */
      var timestamp = today.toISOString();
      for (let i = 0; i < message.length; i++) {
        this.messagesRef.push({
          text: message[i].text,
          user: message[i].user,
          createdAt: timestamp
        });
      }
    }

    createConversation(id1, id2){

        var today = new Date();
        var timestamp = today.toISOString();
        var isExist = false;
        this.messagesRef = firebase.database().ref("conversation");
        var query = this.messagesRef.orderByChild("uid1").equalTo(id1);
        query.once('value', function(snapshot) {
            snapshot.forEach(function(child) {
              child.ref.update({ createdAt: timestamp })
              isExist = true;
            });
          });
        
        query = this.messagesRef.orderByChild("uid2").equalTo(id1);
        query.once('value', function(snapshot) {
            snapshot.forEach(function(child) {
              child.ref.update({ createdAt: timestamp })
              isExist = true;
            });
          });

        
        this.conversationRef.push({
            uid1: id1,
            uid2: id2,
            createdAt: timestamp
        })
    }
    // close the connection to the Backend
    closeChat() {
      if (this.messagesRef) {
        this.messagesRef.off();
      }
    }
  
    getLimit() {
      var today = new Date();
      //var milliseconds = Date.parse(today);
      //var changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
      today.setDate(today.getDate() - 31); // last 30 Days
      //console.log(today);
      var changedISODate = new Date(today).toISOString();
      //var changedISODate = today.toISOString();
      console.log(changedISODate);
      return changedISODate;
    }
  }
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;