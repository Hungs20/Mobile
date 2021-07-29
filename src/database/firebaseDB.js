// database/firebaseDb.js

import * as firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBBWOW9RUgHEimulQWfUTuByV-Zqmn0mzw",
    authDomain: "hungs20.firebaseapp.com",
    databaseURL: "hungs20.firebaseio.com",
    projectId: "hungs20",
    storageBucket: "hungs20.appspot.com",
    messagingSenderId: "000000000000000",
    appId: "1:326910002013:android:249534f0b535575c139eb4"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;