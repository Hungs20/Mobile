import React from 'react'
import {Colors, Fonts} from '../../../styles'
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ListItem, Button, Text, CheckBox, Divider, ThemeProvider, Input } from 'react-native-elements'
import { Component } from 'react'
import Step from './step'
import { ScrollView } from 'react-native-gesture-handler'
import * as Language from '../../language'
import { blue, grayBackground, grayLabel, white } from '../../../styles/colors';
import CreateInfoRoom from './CreateInfoRoom'
import CreateAddressRoom from './CreateAddressRoom'
import CreateExtensionRoom from './CreateExtensionRoom'
import CreateConfirmRoom from './CreateConfirmRoom'

import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

class CreateRoom extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 0,
            maxStep: 0,
            currentUser: null,
            newRoom : {
                id: Date.now(),
                author: {
                    displayName: '',
                    email: '',
                    photoURL: '',
                    uid: ''
                },
                date_create: new Date(),
                vote: 0,
                view: 0,
                info: {
                    typeRoom: null,
                    numRoom : null,
                    numPersonOfRoom : null,
                    gender : null,
                    area : null,
                    giathue: null,
                    giacoc: null,
                    tiendien: null,
                    tiennuoc: null,
                    tienmang: null,
                    dexe: false,
                },
                address: {
                    nameQuan: null,
                    namePhuong: null,
                    nameDuong: null,
                    nameNha: null,
                    nameCity: null
                },
                extension: {
                    listImageUrl: [],
                    listExtChecked: []
                },
                confirm: {
                    phone: null,
                    title: null,
                    description: null,
                    timeOpen: new Date(),
                    timeClose: new Date(),
                    isTimeOpen: false,
                    isTimeClose: false,
                }
                
            }
        }
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser }) 
       // console.log(currentUser)
        this.setState(prevState => ({
            newRoom: {
                ...prevState.newRoom,
                author: {
                    ...prevState.newRoom.author,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    uid: currentUser.uid
                }
              }
          }))
      }
    setConfirm = (value, type) => {
        switch (type) {
            case 'phone':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        confirm: {
                            ...prevState.newRoom.confirm,
                            phone: value
                        }
                      }
                  }))
                break;
            case 'title':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        confirm: {
                            ...prevState.newRoom.confirm,
                            title: value
                        }
                        }
                    }))
                break;
            case 'description':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        confirm: {
                            ...prevState.newRoom.confirm,
                            description: value
                        }
                      }
                  }))
                break;
            case 'timeOpen':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        confirm: {
                            ...prevState.newRoom.confirm,
                            timeOpen: value
                        }
                      }
                  }))
                break;
            case 'timeClose':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        confirm: {
                            ...prevState.newRoom.confirm,
                            timeClose: value
                        }
                      }
                  }))
                break;
            case 'isTimeOpen':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        confirm: {
                            ...prevState.newRoom.confirm,
                            isTimeOpen: value
                        }
                      }
                  }))
                break;
            case 'isTimeClose':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        confirm: {
                            ...prevState.newRoom.confirm,
                            isTimeClose: value
                        }
                      }
                  }))
                break;
            default:
                break;
        }
    }

    setInfoRoom = (value, typeInfo) => {
        switch (typeInfo) {
            case 'typeRoom':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            typeRoom: value
                        }
                      }
                  }))
                break;
            case 'numRoom':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            numRoom: value
                        }
                        }
                    }))
                break;
            case 'numPersonOfRoom':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            numPersonOfRoom: value
                        }
                      }
                  }))
                break;
            case 'gender':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            gender: value
                        }
                      }
                  }))
                break;
            case 'area':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            area: value
                        }
                      }
                  }))
                break;
            case 'giathue':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            giathue: value
                        }
                      }
                  }))
                break;
            case 'giacoc':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            giacoc: value
                        }
                      }
                  }))
                break;
            case 'tiendien':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            tiendien: value
                        }
                      }
                  }))
                break;
            case 'tiennuoc':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            tiennuoc: value
                        }
                      }
                  }))
                break;
            case 'tienmang':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            tienmang: value
                        }
                      }
                  }))
                break;
            case 'dexe':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        info: {
                            ...prevState.newRoom.info,
                            dexe: value
                        }
                      }
                  }))
                break;
            default:
                break;
        } 
        
    }

    setAddressRoom = (value, typeAddress) => {
        switch (typeAddress) {
            case 'nameCity':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        address: {
                            ...prevState.newRoom.address,
                            nameCity: value
                        }
                      }
                  }))
                break;
            case 'nameQuan':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        address: {
                            ...prevState.newRoom.address,
                            nameQuan: value
                        }
                        }
                    }))
                break;
            case 'namePhuong':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        address: {
                            ...prevState.newRoom.address,
                            namePhuong: value
                        }
                      }
                  }))
                break;
            case 'nameDuong':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        address: {
                            ...prevState.newRoom.address,
                            nameDuong: value
                        }
                      }
                  }))
                break;
            case 'nameNha':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        address: {
                            ...prevState.newRoom.address,
                            nameNha: value
                        }
                      }
                  }))
                break;
            default:
                break;
        }
    }

    setExtension = (value, typeExt) => {
        switch (typeExt) {
            case 'image':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        extension: {
                            ...prevState.newRoom.extension,
                            listImageUrl: value
                        }
                      }
                  }))
                break;
            case 'ext':
                this.setState(prevState => ({
                    newRoom: {
                        ...prevState.newRoom,
                        extension: {
                            ...prevState.newRoom.extension,
                            listExtChecked: value
                        }
                        }
                    }))
                break;
            default:
                break;
        }
    }


    setCurrentStep = (value) => {
        this.setState({
            currentStep: value < this.state.maxStep ? value : this.state.maxStep
        })
    }
     addNewRoom = async (newRoom) => {
        const addQuery = await firestore().collection("rooms").add(newRoom)
        const newRoomAdded = await addQuery.get();
        //console.log("the new room:", newRoomAdded.data())
        this.props.navigation.navigate('RoomDetails', {room: newRoomAdded.data()})
      }
    nextBtnPress = () => {
        var validate1 = true
        for(var key in this.state.newRoom.info) {
            if(this.state.newRoom.info[key] === "" || this.state.newRoom.info[key] === null) {
               validate1 = false
            }
        }

        var validate2 = true
        for(var key in this.state.newRoom.address) {
            if(this.state.newRoom.address[key] === "" || this.state.newRoom.address[key] === null) {
               validate2 = false
            }
        }

        var validate3 = true
        for(var key in this.state.newRoom.extension) {
            if(this.state.newRoom.extension[key] === "" || this.state.newRoom.extension[key] === null) {
               validate3 = false
            }
        }

        var validate4 = true
        for(var key in this.state.newRoom.confirm) {
            if(this.state.newRoom.confirm[key] === "" || this.state.newRoom.confirm[key] === null) {
               validate4 = false
            }
        }

        if(this.state.currentStep === 2 && this.state.newRoom.extension["listImageUrl"].length < 5) {
            Alert.alert("Lỗi", "Bạn phải đăng tối thiểu 5 ảnh", [
                {
                  text: "Đồng ý",
                  style: "cancel"
                }
              ], {cancelable: false})
            return
         }
        
        
        if((this.state.currentStep === 0 && validate1 === false) || 
        (this.state.currentStep === 1 && validate2 === false) ||
        (this.state.currentStep === 2 && validate3 === false) ||
        (this.state.currentStep === 3 && validate4 === false) 
        ){
            Alert.alert("Lỗi", "Bạn chưa nhập đủ thông tin", [
                {
                  text: "Đồng ý",
                  style: "cancel"
                }
              ], {cancelable: false})
            return
        }

        this.setState({
            currentStep: this.state.currentStep + 1 < 3 ? this.state.currentStep + 1 : 3,
            maxStep: this.state.currentStep + 1 < this.state.maxStep ? this.state.maxStep : this.state.currentStep + 1
        })
       // console.log(this.state.newRoom)
        if(this.state.currentStep  + 1 == 4){
           // console.log(this.state.newRoom)
            var _newRoom = this.state.newRoom;
            _newRoom.info.area = parseInt(_newRoom.info.area)
            _newRoom.info.giathue = parseInt(_newRoom.info.giathue)
            _newRoom.info.giacoc = parseInt(_newRoom.info.giacoc)
            _newRoom.info.tiendien = parseInt(_newRoom.info.tiendien)
            _newRoom.info.tiennuoc = parseInt(_newRoom.info.tiennuoc)
            _newRoom.info.tienmang = parseInt(_newRoom.info.tienmang)
            _newRoom.info.numRoom = parseInt(_newRoom.info.numRoom)
            _newRoom.info.numPersonOfRoom = parseInt(_newRoom.info.numPersonOfRoom)
           // console.log(_newRoom)
           this.addNewRoom(_newRoom)
        }
    }
    renderSwitch(step){
        switch (step) {
            case 0:
                return <CreateInfoRoom info = {this.state.newRoom.info} setInfo={this.setInfoRoom.bind(this)}/>
            case 1:
                return <CreateAddressRoom address = {this.state.newRoom.address} setAddress={this.setAddressRoom.bind(this)}/>
            case 2:
                return <CreateExtensionRoom extension = {this.state.newRoom.extension} setExtension={this.setExtension.bind(this)}/>
            case 3:
                return <CreateConfirmRoom confirm = {this.state.newRoom.confirm} setConfirm={this.setConfirm.bind(this)}/>
            default:
                break;
        }
    }

    /// Render
    render() {
        return (
            
                <ThemeProvider>
                    <Card><Step currentStep={this.state.currentStep} maxStep={4} setStep={this.setCurrentStep.bind(this)}/></Card>
                    <ScrollView>
                        {this.renderSwitch(this.state.currentStep)}
                        <Text>{'\n'}</Text>
                        <Button
                            title={this.state.currentStep + 1 < 4 ? "Tiếp theo " : "Đăng phòng "}
                            type={this.state.currentStep + 1 < 4 ? "clear" : "solid"}
                            iconRight
                            icon={
                                <Icon name='chevron-right'color={this.state.currentStep + 1 < 4 ? Colors.primary : Colors.white} size={14}/>
                            }
                            titleStyle={this.state.currentStep + 1 < 4 ? styles.btnNext : styles.btnDone}
                            containerStyle={{marginHorizontal: 35, borderColor: Colors.primary, borderWidth: 1, borderRadius: 10}}
                            onPress={this.nextBtnPress}
                        />
                    </ScrollView>
                </ThemeProvider>
            
        )
        
    }
}
const styles = StyleSheet.create({
    btnNext: {
        color: Colors.primary
    },
    btnDone: {
        color: Colors.white
    }
})
export default CreateRoom;
