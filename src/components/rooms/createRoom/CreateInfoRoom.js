import React from 'react'
import {Colors, Fonts} from '../../../styles'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ListItem, Button, Text, CheckBox, Divider, ThemeProvider, Input } from 'react-native-elements'
import { Component } from 'react'
import Step from './step'
import { ScrollView } from 'react-native-gesture-handler'
import * as Language from '../../language'
import { blue, grayBackground, grayLabel, white } from '../../../styles/colors';



class CreateInfoRoom extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            focused: '',
            listRoom: [
                {'label': 'Kí túc xá/Homestay', 'value' : 'Kí túc xá/Homestay'}, 
                {'label': 'Phòng cho thuê', 'value' : 'Phòng cho thuê'}, 
                {'label': 'Phòng ở ghép', 'value' : 'Phòng ở ghép'}, 
                {'label': 'Nhà nguyên căn', 'value' : 'Nhà nguyên căn'}, 
                {'label': 'Căn hộ', 'value' : 'Căn hộ'}
            ],
            listGender: [
                {'label' : 'Tất cả', 'value' : 'Tất cả'},
                {'label' : 'Nam', 'value' : 'Nam'},
                {'label' : 'Nữ', 'vaule' : 'Nữ'}
            ],

            dexe: false,
            isCheckedFreeDien: false,
            isCheckedFreeNuoc: false,
            isCheckedFreeMang: false,
            isCheckedXe: false,
        }
    }
   

    /// Render
    render() {
        return (
                <ThemeProvider>
                    <Card>
                        <Card.Title><Text h5>{Language.ROOM_INFO}</Text></Card.Title>
                        <Card.Divider/>
                        <Text style={styles.title}>{Language.ROOM_TYPE}</Text>
                        {this.state.listRoom.map((data,index) => {
                            return(
                                <CheckBox
                                    left
                                    key={data.value}
                                    title={data.label}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.props.info.typeRoom === data.value}
                                    onPress = {() => this.props.setInfo(data.value, 'typeRoom')}
                                    containerStyle={styles.radioBackground}
                                    textStyle={this.props.info.typeRoom === data.value ? styles.radioLabelSelected : styles.radioLabel}
                                    checkedColor={Colors.primary}
                                />
                            )
                        })}
                
                        <Text style={styles.title}>{"\n" + Language.ROOM_NUM}</Text>
                        <View style={styles.viewRightIcon}>
                            <Input
                                keyboardType="numeric"
                                placeholder="Nhập số lượng phòng"
                                value={this.props.info.numRoom}
                                onChangeText={value => this.props.setInfo(value, 'numRoom')}
                                inputContainerStyle={this.state.focused == 'roomnum' ? styles.inputContainerFocus : styles.inputContainer}
                                inputStyle={styles.inputStyle}
                                containerStyle={{marginRight: -300}}
                                onFocus={() => this.setState({ focused: 'roomnum' })}
                                onBlur={() => this.setState({ focused: '' })}
                            />
                            <Text style={styles.rightText}>phòng</Text>
                        </View>

                        <Text style={styles.title}>{Language.ROOM_HAVE}</Text>
                        <View style={styles.viewRightIcon}>
                            <Input
                                keyboardType="numeric"
                                placeholder="Nhập số người/phòng"
                                value={this.props.info.numPersonOfRoom}
                                onChangeText={value => this.props.setInfo(value, 'numPersonOfRoom')}
                                inputContainerStyle={this.state.focused == 'roomhave' ? styles.inputContainerFocus : styles.inputContainer}
                                inputStyle={styles.inputStyle}
                                containerStyle={{marginRight: -300}}
                                onFocus={() => this.setState({ focused: 'roomhave' })}
                                onBlur={() => this.setState({ focused: '' })}
                            />
                            <Text style={styles.rightText}>người/phòng</Text>
                        </View>
                        <Text style={styles.title}>{Language.ROOM_GENDER}</Text>
                        {this.state.listGender.map((data,index) => {
                            return(
                                <CheckBox
                                    key={index}
                                    title={data.label}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.props.info.gender === data.value}
                                    onPress = {() => this.props.setInfo(data.value, 'gender')}
                                    containerStyle={styles.radioBackground}
                                    textStyle={this.props.info.gender === data.value ? styles.radioLabelSelected : styles.radioLabel}
                                    checkedColor={Colors.primary}
                                />
                            )
                        })}

                        <Text style={styles.title}>{"\n" + Language.ROOM_AREA}</Text>
                        <View style={styles.viewRightIcon}>
                            <Input
                                keyboardType="numeric"
                                placeholder="Nhập diện tích phòng"
                                value={this.props.info.area}
                                onChangeText={value => this.props.setInfo(value, 'area')}
                                inputContainerStyle={this.state.focused == 'dientich' ? styles.inputContainerFocus : styles.inputContainer}
                                inputStyle={styles.inputStyle}
                                containerStyle={{marginRight: -300}}
                                onFocus={() => this.setState({ focused: 'dientich' })}
                                onBlur={() => this.setState({ focused: '' })}
                            />
                            <Text style={styles.rightText}>m2</Text>
                        </View>
                    </Card>
                    <Card>
                        <Card.Title><Text h5>{Language.ROOM_COST}</Text></Card.Title>
                        <Card.Divider/>
                        <Text style={styles.title}>{Language.ROOM_COST_THUE}</Text>
                        <View style={styles.viewRightIcon}>
                            <Input
                                keyboardType="numeric"
                                placeholder="Nhập giá cho thuê"
                                value={this.props.info.giathue}
                                onChangeText={value => this.props.setInfo(value, 'giathue')}
                                inputContainerStyle={this.state.focused == 'roomcostthue' ? styles.inputContainerFocus : styles.inputContainer}
                                inputStyle={styles.inputStyle}
                                containerStyle={{marginRight: -300}}
                                onFocus={() => this.setState({ focused: 'roomcostthue' })}
                                onBlur={() => this.setState({ focused: '' })}
                            />
                            <Text style={styles.rightText}>VND/người</Text>
                        </View>

                        <Text style={styles.title}>{Language.ROOM_COST_COC}</Text>
                        <View style={styles.viewRightIcon}>
                            <Input
                                keyboardType="numeric"
                                placeholder="Nhập số tiền cọc"
                                value={this.props.info.giacoc}
                                onChangeText={value => this.props.setInfo(value, 'giacoc')}
                                inputContainerStyle={this.state.focused == 'roomcostcoc' ? styles.inputContainerFocus : styles.inputContainer}
                                inputStyle={styles.inputStyle}
                                containerStyle={{marginRight: -300}}
                                onFocus={() => this.setState({ focused: 'roomcostcoc' })}
                                onBlur={() => this.setState({ focused: '' })}
                            />
                            <Text style={styles.rightText}>VND</Text>
                        </View>

                        <Text style={styles.title}>{Language.ROOM_COST_DIEN}</Text>
                        <View style={styles.viewRightIcon}>
                            {this.state.isCheckedFreeDien ? 
                            <Input
                                value="Miễn phí"
                                disabled
                                inputContainerStyle={this.state.focused == 'tiendien' ? styles.inputContainerFocus : styles.inputContainer}
                                inputStyle={{ color: "black", fontWeight: 'bold', fontSize: 16}}
                                containerStyle={{marginRight: -200}}
                                
                            />
                            : <Input
                            keyboardType="numeric"
                            placeholder="Nhập số tiền"
                            value={this.props.info.tiendien}
                            onChangeText={value => this.props.setInfo(value, 'tiendien')}
                            inputContainerStyle={this.state.focused == 'tiendien' ? styles.inputContainerFocus : styles.inputContainer}
                            inputStyle={styles.inputStyle}
                            containerStyle={{marginRight: -200}}
                            onFocus={() => this.setState({ focused: 'tiendien' })}
                            onBlur={() => this.setState({ focused: '' })}
                        />
                            }
                            <Text style={styles.rightText}>VND</Text>
                            <CheckBox
                                right
                                title='MIỄN PHÍ'
                                checked={this.state.isCheckedFreeDien}
                                onPress={
                                    ()=>{
                                        this.props.setInfo("0", 'tiendien')
                                        this.setState({
                                            isCheckedFreeDien : !this.state.isCheckedFreeDien
                                        })
                                    }
                                }
                                containerStyle={{backgroundColor: white, borderColor: white, marginBottom: 30, color: grayLabel, marginRight: -15}}
                                textStyle={{color: grayLabel, fontSize: 12}}
                                />
                        </View>

                    
                        <Text style={styles.title}>{Language.ROOM_COST_NUOC}</Text>
                        <View style={styles.viewRightIcon}>
                            {this.state.isCheckedFreeNuoc ? 
                            <Input
                                value="Miễn phí"
                                disabled
                                inputContainerStyle={this.state.focused == 'tiennuoc' ? styles.inputContainerFocus : styles.inputContainer}
                                inputStyle={{ color: "black", fontWeight: 'bold', fontSize: 16}}
                                containerStyle={{marginRight: -200}}
                                
                            />
                            : <Input
                            keyboardType="numeric"
                            placeholder="Nhập số tiền"
                            value={this.props.info.tiennuoc}
                            onChangeText={value => this.props.setInfo(value, 'tiennuoc')}
                            inputContainerStyle={this.state.focused == 'tiennuoc' ? styles.inputContainerFocus : styles.inputContainer}
                            inputStyle={styles.inputStyle}
                            containerStyle={{marginRight: -200}}
                            onFocus={() => this.setState({ focused: 'tiennuoc' })}
                            onBlur={() => this.setState({ focused: '' })}
                        />
                            }
                            <Text style={styles.rightText}>VND</Text>
                            <CheckBox
                                right
                                title='MIỄN PHÍ'
                                checked={this.state.isCheckedFreeNuoc}
                                onPress={
                                    ()=>{
                                        this.props.setInfo("0", 'tiennuoc')
                                        this.setState({
                                            isCheckedFreeNuoc : !this.state.isCheckedFreeNuoc
                                        })
                                    }
                                }
                                containerStyle={{backgroundColor: white, borderColor: white, marginBottom: 30, color: grayLabel, marginRight: -15}}
                                textStyle={{color: grayLabel, fontSize: 12}}
                                />
                        </View>

                        <Text style={styles.title}>{Language.ROOM_COST_MANG}</Text>
                        <View style={styles.viewRightIcon}>
                            {this.state.isCheckedFreeMang ? 
                            <Input
                                value="Miễn phí"
                                disabled
                                inputContainerStyle={this.state.focused == 'tienmang' ? styles.inputContainerFocus : styles.inputContainer}
                                inputStyle={{ color: "black", fontWeight: 'bold', fontSize: 16}}
                                containerStyle={{marginRight: -200}}
                                
                            />
                            : <Input
                            keyboardType="numeric"
                            placeholder="Nhập số tiền"
                            value={this.props.info.tienmang}
                            onChangeText={value => this.props.setInfo(value, 'tienmang')}
                            inputContainerStyle={this.state.focused == 'tienmang' ? styles.inputContainerFocus : styles.inputContainer}
                            inputStyle={styles.inputStyle}
                            containerStyle={{marginRight: -200}}
                            onFocus={() => this.setState({ focused: 'tienmang' })}
                            onBlur={() => this.setState({ focused: '' })}
                        />
                            }
                            <Text style={styles.rightText}>VND</Text>
                            <CheckBox
                                right
                                title='MIỄN PHÍ'
                                checked={this.state.isCheckedFreeMang}
                                onPress={
                                    ()=>{
                                        this.props.setInfo("0", 'tienmang')
                                        this.setState({
                                            isCheckedFreeMang : !this.state.isCheckedFreeMang
                                        })
                                    }
                                }
                                containerStyle={{backgroundColor: white, borderColor: white, marginBottom: 30, color: grayLabel, marginRight: -15}}
                                textStyle={{color: grayLabel, fontSize: 12}}
                                />
                        </View>
                        
                        <CheckBox
                            left
                            title={Language.ROOM_HAVE_XE}
                            checked={this.props.info.dexe}
                            onPress={
                                ()=>{
                                    this.props.setInfo(!this.props.info.dexe, 'dexe')
                                }
                            }
                            containerStyle={{backgroundColor: white, borderColor: white, marginVertical: 0}}
                            textStyle={{color: grayLabel, fontSize: 16}}
                            />

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
        textTransform: 'uppercase'
    },
    radioLabel: {
        color: grayLabel, 
        fontWeight: 'normal',
        fontSize: 16
    },
    radioLabelSelected: {
        color: 'black', 
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
        alignItems: "center" }
})
export default CreateInfoRoom;
