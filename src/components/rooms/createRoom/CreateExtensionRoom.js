import React from 'react'
import {Colors, Fonts} from '../../../styles'
import {StyleSheet, View, TouchableOpacity, Alert, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ListItem, Button, Text, CheckBox, Divider, ThemeProvider, Input, Overlay, Avatar , Image, ButtonGroup } from 'react-native-elements'
import { Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import * as Language from '../../language'
import { blue, grayBackground, grayLabel, white } from '../../../styles/colors';
import DocumentPicker from 'react-native-document-picker';
import { ActivityIndicator } from 'react-native';

import { IconButton } from 'react-native-paper'

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
class CreateExtensionRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            listImageUrl: [],
            listExtChecked: [],
            image: null,
            uploading: false,
            transferred: 0,
          };
    }

   selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
    };
    launchImageLibrary(options, async response => {
      console.log(response)
      if (response.uri != null) {
        const source = { uri: response.uri };
        console.log(source);
        this.setState({
          image: source
        })
        this.uploadImage()
      }
    });
  };

  uploadImage = async () => {
    console.log("aaaa")
    const { uri } = this.state.image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    this.setState({
      uploading: true,
      transferred: 0
    })
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      this.setState({
        transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      });
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    console.log(filename);
    const url = await storage()
  .ref(filename)
  .getDownloadURL();

    console.log(url);
    this.addImageUrl(this.props.extension.listImageUrl, url)
    this.setState({
      uploading: false,
      image: null
    });
  };

    addImageUrl = (array, value) => {
      console.log(array)
      console.log(value)
      var index = array.indexOf(value)
      if (index === -1) array.push(value);
      else array.splice(index, 1);
      this.props.setExtension(array,'image');
    }
    addExtChecked = (array, value) => {
      var index = array.indexOf(value)
      if (index === -1) array.push(value);
      else array.splice(index, 1);
      /*this.setState({
        listExtChecked: array
      })*/
      this.props.setExtension(array,'ext');
    }
    async SingleFilePicker() {
        
        try {
            const results = await DocumentPicker.pickMultiple({
              type: [DocumentPicker.types.images],
            });
            //this.setState({singleFileOBJ: results})
            this.props.setExtension(results,'image');
            console.log(results);
            this.uploadImageToStorage(results.uri, results.name);
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
      }
      showImagePicker = (array) => {
        
        return array.map((images, index) => {
          // don't put your key as index, choose other unique values as your key.
          return <ImageBackground
            key={index}
            source={{uri: images}}
            style={{width: 60, height: 60, marginHorizontal: 5}} 
            PlaceholderContent={<ActivityIndicator />}
            >
              <IconButton
                style={{position: 'absolute', alignSelf: 'flex-end',
                marginTop: -5}}
                icon="close"
                //color={this.state.isLoveRoom ? "red": Colors.white}
                size={20}
               onPress={() => {
                array.splice(index, 1);
                this.props.setExtension(array,'image');
               }}
            />
          </ImageBackground>
        })
      }
      
    render(){
      const exts = [{name: 'WC riêng',icon: 'toilet'},{name: 'Cửa sổ', icon: 'window-open-variant'}, {name: 'Wifi', icon: 'wifi'}, {name:'Chủ riêng',icon:'account-key-outline'}, {name:'Máy nước nóng',icon:'water-boiler'}, {name:'Tủ lạnh',icon:'fridge-outline'}, {name:'Gác lửng',icon:'stairs'}, {name:'Tủ đồ',icon:'locker'}, {name:'Thú cưng', icon:'dog'}]
      const exts2 = [{name: 'Chỗ để xe',icon: 'motorbike'},{name: 'An ninh', icon: 'security'}, {name: 'Tự do', icon: 'clock-outline'}, {name:'Máy lạnh',icon:'air-conditioner'}, {name:'Nhà bếp',icon:'chef-hat'}, {name:'Máy giặt',icon:'washing-machine'}, {name:'Giường',icon:'bed-outline'}, {name:'Tivi',icon:'television'}, {name:'Ban công', icon:'window-shutter'}]
         
        return(
            <ThemeProvider>
                <Card>
                    <Card.Title><Text h5>{Language.ROOM_EXTENSION}</Text></Card.Title>
                    <Card.Divider/>
                    <Text style={styles.title}>{'Hình ảnh'}</Text>
                    <View style={{paddingHorizontal: 10, borderStyle:'dashed',borderColor: grayBackground, borderWidth: 1, flex: 1, flexDirection:'column'}}>
                        <View style={{flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>{
                          this.showImagePicker(this.props.extension.listImageUrl)
                        }</ScrollView>
                        </View>
                        {this.state.uploading ? (
                          <View style={{marginHorizontal: 20, marginVertical: 5, alignItems: "center"}}>
                            <Progress.Bar progress={this.state.transferred} width={200} />
                          </View>
                        ) : null
                        }
                        <TouchableOpacity onPress={this.selectImage} style={{alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20}}>
                            <Icon name='upload' color={Colors.primary} size={25}/>
                            <Text style={{justifyContent: 'center', color: Colors.primary}}>  Bấm vào đây để đăng hình ảnh từ thư viện nhé</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>{'\n'}</Text>
                    

                <Text style={styles.title}>{'Tiện ích'}</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                  {exts.map((data, index) => {
                      return (
                        <CheckBox
                        key={index}
                        title={data.name}
                        iconType='material-community'
                        checkedIcon={data.icon}
                        uncheckedIcon={data.icon}
                        containerStyle={this.props.extension.listExtChecked.indexOf(data.name) === -1 ? styles.extensionButton : styles.extensionButtonSelected}
                        textStyle={this.props.extension.listExtChecked.indexOf(data.name) === -1 ? styles.extensionText : styles.extensionTextSelected}
                        size={17}
                        checkedColor={Colors.primary}
                        checked={this.props.extension.listExtChecked.indexOf(data.name) === -1 ? false : true}
                        onPress={() => this.addExtChecked(this.props.extension.listExtChecked, data.name)}
                    />
                      )
                  })}
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  {exts2.map((data, index) => {
                      return (
                      <CheckBox
                          key={index}
                          title={data.name}
                          iconType='material-community'
                          checkedIcon={data.icon}
                          uncheckedIcon={data.icon}
                          containerStyle={this.props.extension.listExtChecked.indexOf(data.name) === -1 ? styles.extensionButton : styles.extensionButtonSelected}
                          textStyle={this.props.extension.listExtChecked.indexOf(data.name) === -1 ? styles.extensionText : styles.extensionTextSelected}
                          size={17}
                          checkedColor={Colors.primary}
                          checked={this.props.extension.listExtChecked.indexOf(data.name) === -1 ? false : true}
                          onPress={() => this.addExtChecked(this.props.extension.listExtChecked, data.name)}
                      />
                      )
                  })}
                </View>
                </View>
                </Card>
            </ThemeProvider>
        )
    }
}

const styles = StyleSheet.create({
    title : {
        fontSize: 13,
        color: Colors.grayLabel, 
        fontWeight:'bold',
        textTransform: 'uppercase',
        paddingVertical: 10
    },
    radioLabel: {
        color: grayLabel, 
        fontWeight: 'normal',
        fontSize: 16
    },
    radioBackground: {
        backgroundColor: white, 
        borderColor: white, 
        marginVertical: 0, 
        borderBottomColor: grayBackground,
        fontSize: 16
    },
    inputContainer: {
        borderBottomColor: grayBackground,
        marginVertical: 0, 
        paddingVertical: 0
    },
    inputContainerFocus: {
        borderBottomColor: blue
    },
    inputStyle: {fontSize: 16},
    rightText: {
        fontSize: 16,
        color: grayLabel,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    viewRightIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
     },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
        },
        ratingImage: {
        height: 19.21,
        width: 100
        },
        ratingText: {
        paddingLeft: 10,
        color: 'grey'
        },
        containerListItem: {paddingVertical: 5, borderBottomColor: grayBackground, borderBottomWidth: 1, paddingHorizontal: 0},
        containerListItemFocus: {paddingVertical: 5, borderBottomColor: blue, borderBottomWidth: 1, paddingHorizontal: 0},
        
        containerListItemError: {paddingVertical: 0, borderBottomColor: "red", borderBottomWidth: 1, paddingHorizontal: 0},
        subtitleItem:{color: 'black', fontSize: 16},
        subtitleItemPlaceholder:{color: grayLabel, fontSize: 16},
        itemError: {color: "red", fontSize: 13},
        extensionButtonSelected:{borderColor: Colors.primary, borderWidth: 1, borderRadius: 10},
        extensionButton:{borderColor: Colors.grayBackground, borderWidth: 0, borderRadius: 10},
        extensionTextSelected:{fontSize: 14, color: Colors.primary, fontWeight: 'normal'},
        extensionText:{fontSize: 14, color: grayLabel, fontWeight: 'normal'},
})
export default CreateExtensionRoom;