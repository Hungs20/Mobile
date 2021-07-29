import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text, Card, ThemeProvider  } from 'react-native-elements';
import * as Colors from '../../styles/colors'
import { SliderBox } from "react-native-image-slider-box";
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
GoogleSignin.configure({
  webClientId: '326910002013-l4l7sdr0o214s1s10aeuhim63u3sp19s.apps.googleusercontent.com',
});
export default class Login extends React.Component {
  state = { 
    email: '', password: '', errorMessage: null, focused: '',
    name: '',
    images: [
      require('../../data/img/intro1.jpg'),
      require('../../data/img/intro2.png'),          // Local image
    ],
    isSignup: false,
    loading: false,
  }
  handleLogin = () => {
    // TODO: Firebase stuff...
    const { email, password } = this.state
    this.setState({loading: true})
    if(email == '' || password == ''){
      this.setState({errorMessage: 'Bạn phải nhập đủ thông tin'})
      return
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() =>  this.props.navigation.navigate('Main') )
      .catch(error => this.setState({ errorMessage: error.message }))
    console.log('handleLogin')
  }
  handleSignUp = () => {
      const { email, password, name } = this.state
      this.setState({loading: true})
      if(email == '' || password == '' || name == ''){
        this.setState({errorMessage: 'Bạn phải nhập đủ thông tin'})
        return
      }
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        var userf = firebase.auth().currentUser;
        userf.updateProfile({ displayName: name, photoURL: 'https://ui-avatars.com/api/?background=random&name='+name}).then(()=>{
          const newUser = {
            uid: userf.uid,
            language: 'Tiếng Việt',
            location: 'Hà Nội',
            unitMoney: 'VND'
          }
          firestore()
            .collection('users')
            .add(newUser)
            .then(() => {
                console.log('User added!');
                this.props.navigation.navigate('Main')
            });
          
        })
         
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    console.log('handleSignUp')
  }

  async onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return firebase.auth().signInWithCredential(googleCredential).then(async() => {
      var userf = firebase.auth().currentUser;
        const newUser = {
          uid: userf.uid,
          language: 'Tiếng Việt',
          location: 'Hà Nội',
          unitMoney: 'VND'
        }
        const citiesRef = firestore().collection('users');
        const snapshot = await citiesRef.where('uid', '==', userf.uid).get();
        if (snapshot.empty) {
          firestore()
          .collection('users')
          .add(newUser)
          .then(() => {
              console.log('User added!');
          });
          return;
        }  
        
       
    });
  }


  render() {
    return (
      <ThemeProvider>
      <ScrollView>
        <SliderBox
          images={this.state.images}
          sliderBoxHeight={300}
          dotColor={Colors.blue}
          inactiveDotColor={Colors.white}
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
        />
        <Card>
          <Card.Title><Text h5>{this.state.isSignup ? 'Đăng kí tài khoản' : 'Đăng nhập'}</Text></Card.Title>
          <Card.Divider/>
        {this.state.errorMessage &&
           Alert.alert("Lỗi", this.state.errorMessage, [
            {
              text: "Đồng ý",
              onPress: () => this.setState({errorMessage: null, loading: false}),
              style: "cancel"
            }
          ],
          { cancelable: false })
          }
         
          <Input
            label="Tài khoản"
            placeholder="Nhập địa chỉ email"
            autoCapitalize="none"
            leftIcon={{ type: 'font-awesome', name: 'envelope', size: 20 }}
            onChangeText={value => this.setState({ email: value })}
            value={this.state.email}
            onFocus={() => this.setState({ focused: 'email' })}
            onBlur={() => this.setState({ focused: '' })}
            inputStyle={styles.inputStyle}
            selectionColor={Colors.blue}
            inputContainerStyle = {this.state.focused == 'email' ? styles.inputContainerFocus : styles.inputContainerStyle}
            
            />

          <Input
            label="Mật khẩu"
            secureTextEntry={true}
            placeholder="Nhập mật khẩu"
            autoCapitalize="none"
            leftIcon={{ type: 'font-awesome', name: 'lock', size: 20}}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
            onFocus={() => this.setState({ focused: 'password' })}
            onBlur={() => this.setState({ focused: '' })}
            inputStyle={styles.inputStyle}
            selectionColor={Colors.blue}
            inputContainerStyle = {this.state.focused == 'password' ? styles.inputContainerFocus : styles.inputContainerStyle}
            />
        {this.state.isSignup ?
          <Input
            label="Tên hiển thị"
            placeholder="Nhập tên hiển thị"
            autoCapitalize="none"
            leftIcon={{ type: 'font-awesome', name: 'user', size: 20 }}
            onChangeText={value => this.setState({ name: value })}
            value={this.state.name}
            onFocus={() => this.setState({ focused: 'name' })}
            onBlur={() => this.setState({ focused: '' })}
            inputStyle={styles.inputStyle}
            selectionColor={Colors.blue}
            inputContainerStyle = {this.state.focused == 'name' ? styles.inputContainerFocus : styles.inputContainerStyle}
            
            /> : null }
        </Card>
          <Text>{'\n'}</Text>

          
        <Button 
          title={this.state.isSignup ? "Đăng kí" : "Đăng nhập"}
          type="clear"
          loading={this.state.loading}
          loadingProps={{color: Colors.pink}}
          titleStyle={{color: Colors.primary}}
          containerStyle={{marginHorizontal: 35, borderColor: Colors.primary, borderWidth: 1, borderRadius: 10}}
          onPress={this.state.isSignup ? this.handleSignUp : this.handleLogin} />
        <TouchableOpacity style={{marginVertical: 15, alignItems: 'center'}} onPress={()=>this.setState({isSignup: !this.state.isSignup, errorMessage: null})}>
          <Text>{this.state.isSignup ? "Bạn đã có tài khoản ?" : "Bạn chưa có tài khoản ?"}</Text>
          <Text style={{color: Colors.pink}}>{this.state.isSignup ? "Đăng nhập thôi nào!" : "Tạo tài khoản mới!"}</Text>
        </TouchableOpacity>

        <GoogleSigninButton
                style={{marginHorizontal: 35, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
              />
              
      </ScrollView></ThemeProvider>
    )
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: Colors.grayBackground,
    marginVertical: 0, 
    paddingVertical: 0
  },
  inputContainerFocus: {
      borderBottomColor: Colors.blue
  },
  inputStyle: {fontSize: 16},
})