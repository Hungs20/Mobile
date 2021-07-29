import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text, Card } from 'react-native-elements';
import * as Colors from '../../styles/colors'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null, focused: '' }
  handleSignUp = () => {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
    console.log('handleSignUp')
  }
render() {
  console.log(this.state.focused)
    return (
      <View>
        <Card>
          <Card.Title><Text h5>Đăng kí tài khoản</Text></Card.Title>
          <Card.Divider/>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

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
        </Card>
        <Text>{'\n'}</Text>
        <Button 
          title="Đăng kí"
          type="clear"
          titleStyle={{color: Colors.primary}}
          containerStyle={{marginHorizontal: 35, borderColor: Colors.primary, borderWidth: 1, borderRadius: 10}}
          onPress={this.handleSignUp} />
        
      </View>
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