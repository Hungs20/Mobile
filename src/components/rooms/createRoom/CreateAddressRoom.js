import React from 'react'
import {Colors, Fonts} from '../../../styles'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ListItem, Button, Text, CheckBox, Divider, ThemeProvider, Input, Overlay, Avatar  } from 'react-native-elements'
import { Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import * as Language from '../../language'
import { blue, grayBackground, grayLabel, white } from '../../../styles/colors';
import listLocation from '../../../data/location.json'


class CreateAddressRoom extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            idSelected: 0,
            idCity: 0,
            idQuan: -1,
            idPhuong:-1,
            nameQuan: '',
            namePhuong: '',
            nameDuong: '',
            nameNha: '',
            nameCity: listLocation[0].name,
            typeSelected: '',
            isShowErrorCity : false,
            isShowErrorQuan : false,
            isShowErrorPhuong : false,
            listData: listLocation,
            focused: '',
        }
    }
    getListData = (value) => {
        switch (value) {
            case 'thanhpho':
                this.setState({
                    listData : listLocation
                })
                break;
            case 'quan':
                if(this.state.idCity < 0) break;
                this.setState({
                    listData : listLocation[this.state.idCity].huyen
                })
                break;
                
            case 'phuong':
                if(this.state.idQuan < 0) break;
                this.setState({
                    listData : listLocation[this.state.idCity].huyen[this.state.idQuan].xa
                })
                break;
            default:
                break;
        }
        
    }
    setIdSelected = (value) => {
        switch (value) {
            case 'thanhpho':
                this.setState({idSelected: this.state.idCity < 0 ? 0 : this.state.idCity})
                break;
            case 'quan':
                this.setState({idSelected: this.state.idQuan < 0 ? 0 : this.state.idQuan})
                break;
            case 'phuong':
                this.setState({idSelected: this.state.idPhuong < 0 ? 0 : this.state.idPhuong})
                break;
        
            default:
                break;
        }
    }
   toggleOverlay = (value) => {
        switch (value) {
            case 'thanhpho':
                this.setState({
                    visible: !this.state.visible
                })
                break;
            case 'quan':
                this.setState({
                    isShowErrorCity: this.state.idCity < 0 ? true : false,
                    visible: this.state.idCity < 0 ? false : !this.state.visible
                })
                break;
            case 'phuong':
                this.setState({
                    isShowErrorCity: this.state.idCity < 0 ? true : false,
                    isShowErrorQuan: this.state.idQuan < 0 ? true : false,
                    visible: this.state.idQuan < 0 ? false : !this.state.visible
                })
                break;
        
            default:
                this.setState({
                    visible: !this.state.visible
                })
                break;
        }
        this.setState({
            typeSelected: value,
            //visible: !this.state.visible
        })
            this.getListData(value)
            this.setIdSelected(value)
        
        
  };

    chooseLocation = () => {
        switch (this.state.typeSelected) {
            case 'thanhpho':
                this.setState({
                    idCity: this.state.idSelected,
                   // nameCity: this.state.listData[this.state.idSelected].name,
                    isShowErrorCity: false,
                    idQuan : -1,
                  //  nameQuan : '',
                    idPhuong : -1,
                  //  namePhuong : '',
                })
                this.props.setAddress(this.state.listData[this.state.idSelected].name, 'nameCity');
                this.props.setAddress(null, 'nameQuan');
                this.props.setAddress(null, 'namePhuong');
                break;
            case 'quan':
                this.setState({
                    idQuan: this.state.idSelected,
                    //nameQuan: this.state.listData[this.state.idSelected].name,
                    isShowErrorQuan: false,
                    idPhuong : -1,
                });
                this.props.setAddress(this.state.listData[this.state.idSelected].name, 'nameQuan');
                this.props.setAddress(null, 'namePhuong');
                break;
            case 'phuong':
                this.setState({
                    idPhuong: this.state.idSelected,
                    //namePhuong: this.state.listData[this.state.idSelected].name,
                    isShowErrorPhuong: false
                });
                this.props.setAddress(this.state.listData[this.state.idSelected].name, 'namePhuong');
                break;
            default:

                break;
        }
        this.setState({
            visible: false
        })
    };

    renderLanguage(state){
        switch (state) {
            case 'thanhpho':
                return Language.ROOM_CITY
            case 'quan':
                return Language.ROOM_QUAN
            case 'phuong':
                return Language.ROOM_PHUONG
            default:
                break;
        }
    }
    
    render(){
        return(
                <ThemeProvider>
                <Overlay isVisible={this.state.visible} onBackdropPress={()=>this.toggleOverlay('')}>
                    <View style={{width: 365, maxHeight: 400}}>
                        <Text style={styles.title}>{this.renderLanguage(this.state.typeSelected)}</Text>
                            <ScrollView>
                                {this.state.listData.map((data,index) => {
                                    return(
                                        <CheckBox
                                            left
                                            key={data.id}
                                            title={data.name}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={this.state.idSelected === index}
                                            onPress = {() => this.setState({
                                                idSelected: index
                                            })}
                                            containerStyle={styles.radioBackground}
                                            textStyle={styles.radioLabel}
                                            checkedColor={Colors.primary}
                                        />
                                    )
                                })}
                            </ScrollView>
                            <Text>{'\n'}</Text>
                            <Button title="OK" type="outline"  titleStyle={{color: Colors.primary}}
                            containerStyle={{marginHorizontal: 35, borderColor: Colors.primary, borderWidth: 1, borderRadius: 10}}
                              onPress={this.chooseLocation}/>
                    </View>
                </Overlay>
                    <Card>
                        <Card.Title><Text h5>{Language.ROOM_ADDRESS}</Text></Card.Title>
                        <Card.Divider/>
                        <TouchableOpacity onPress={() => this.toggleOverlay('thanhpho')}>
                         <ListItem containerStyle={this.state.isShowErrorCity ? styles.containerListItemError : styles.containerListItem} >
                            <ListItem.Content>
                            <Text style={styles.title}>{Language.ROOM_CITY}</Text>
                                <Text style={this.props.address.nameCity === null ? styles.subtitleItemPlaceholder : styles.subtitleItem}>{this.props.address.nameCity === null ? 'Bấm vào đây để chọn ' + Language.ROOM_CITY : this.props.address.nameCity} </Text>
                            </ListItem.Content>
                            <Icon name='chevron-down' size={13}/>
                        </ListItem>
                        </TouchableOpacity>
                        {this.state.isShowErrorCity ? <Text style={styles.itemError}>Vui lòng chọn {Language.ROOM_CITY}</Text> : <View></View>}
                        
                        <TouchableOpacity onPress={() => this.toggleOverlay('quan')}>
                        <ListItem containerStyle={this.state.isShowErrorQuan ? styles.containerListItemError : styles.containerListItem} >
                            <ListItem.Content>
                            <Text style={styles.title}>{Language.ROOM_QUAN}</Text>
                                <Text style={this.props.address.nameQuan === null ? styles.subtitleItemPlaceholder : styles.subtitleItem}>{this.props.address.nameQuan === null ? 'Bấm vào đây để chọn ' + Language.ROOM_QUAN : this.props.address.nameQuan} </Text>
                            </ListItem.Content>
                            <Icon name='chevron-down' size={13}/>
                        </ListItem>
                        </TouchableOpacity>
                        {this.state.isShowErrorQuan ? <Text style={styles.itemError}>Vui lòng chọn {Language.ROOM_QUAN}</Text> : <View></View>}
                        
                        <TouchableOpacity onPress={() => this.toggleOverlay('phuong')}>
                        <ListItem containerStyle={this.state.isShowErrorPhuong ? styles.containerListItemError : styles.containerListItem} >
                            <ListItem.Content>
                            <Text style={styles.title}>{Language.ROOM_PHUONG}</Text>
                                <Text style={this.props.address.namePhuong === null ? styles.subtitleItemPlaceholder : styles.subtitleItem}>{this.props.address.namePhuong === null ? 'Bấm vào đây để chọn ' + Language.ROOM_PHUONG : this.props.address.namePhuong} </Text>
                            </ListItem.Content>
                            <Icon name='chevron-down' size={13}/>
                        </ListItem>
                        </TouchableOpacity>
                        {this.state.isShowErrorPhuong ? <Text style={styles.itemError}>Vui lòng chọn {Language.ROOM_PHUONG}</Text> : <View></View>}
                        
                        <ListItem containerStyle={this.state.focused == 'roomduong' ? styles.containerListItemFocus : styles.containerListItem}>
                            <ListItem.Content>
                                <Text style={styles.title}>{Language.ROOM_DUONG}</Text>
                                <Input
                                    placeholder="Ví dụ: Huỳnh Văn Bánh"
                                    value={this.props.address.nameDuong}
                                    onChangeText={value => this.props.setAddress(value, 'nameDuong')}
                                    inputContainerStyle={{marginHorizontal: -10, borderBottomColor: 'white', marginBottom: -25, marginTop: -10}}
                                    inputStyle={styles.inputStyle}
                                    onFocus={() => this.setState({ focused: 'roomduong' })}
                                    onBlur={() => this.setState({ focused: '' })}
                                />
                            </ListItem.Content>
                        </ListItem>
                        
                        <ListItem containerStyle={this.state.focused == 'sonha' ? styles.containerListItemFocus : styles.containerListItem}>
                            <ListItem.Content>
                                <Text style={styles.title}>{Language.ROOM_NHA}</Text>
                                <Input
                                    placeholder="Ví dụ: 244/31"
                                    value={this.props.address.nameNha}
                                    onChangeText={value => this.props.setAddress(value, 'nameNha')}
                                    inputContainerStyle={{marginHorizontal: -10, borderBottomColor: 'white', marginBottom: -25, marginTop: -10}}
                                    inputStyle={styles.inputStyle}
                                    onFocus={() => this.setState({ focused: 'sonha' })}
                                    onBlur={() => this.setState({ focused: '' })}
                                />
                            </ListItem.Content>
                        </ListItem>

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
        itemError: {color: "red", fontSize: 13}
    
        
})
export default CreateAddressRoom;