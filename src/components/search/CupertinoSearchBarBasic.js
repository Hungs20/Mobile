import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Colors from '../../styles/colors'
import { Overlay, CheckBox, Button } from 'react-native-elements'

class CupertinoSearchBarBasic extends Component {
  constructor(props){
    super(props)
    this.state = {
      isToggle: false,
      addressIdSelected: 0,
      listAddress: [{name: "Hà Nội", value: "Hà Nội"}, {name: "Đà Nẵng", value: "Đà Nẵng"}, {name: "Hồ Chí Minh", value: "HCM"}],
    }
  }
  toggleOverlay = () => {
    console.log("toggle")
      this.setState({isToggle: !this.state.isToggle})
  }
  render(){
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity style={styles.inputBox} onPress={()=>this.props.navigation.navigate('SearchResult', {querySearch: ''})}>
          <TouchableOpacity style={{flex: 0.5, flexDirection: "row", }} onPress={this.toggleOverlay}>
            <Icon name="magnify" style={styles.inputLeftIcon}></Icon><Text style={{color: Colors.pink, fontSize: 13}}>{this.state.listAddress[this.state.addressIdSelected].value}</Text>
          </TouchableOpacity>
          <View style={styles.inputStyle}><Text style={{color:"gray", textAlign: "center", justifyContent: "center", fontSize: 13}}>Tìm theo quận, tên đường, địa điểm</Text></View>
        </TouchableOpacity>
        <Overlay isVisible={this.state.isToggle} onBackdropPress={()=>this.toggleOverlay}>
            <View style={{width: 300, maxHeight: 400}}>
                <Text style={styles.title}>Chọn địa điểm</Text>
                    <ScrollView>
                        {this.state.listAddress.map((data,index) => {
                            return(
                                <CheckBox
                                    left
                                    key={index}
                                    title={data.name}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.state.addressIdSelected == index}
                                    onPress = {() => this.setState({
                                      addressIdSelected: index,
                                      isToggle: !this.state.isToggle
                                    })}
                                    containerStyle={styles.radioBackground}
                                    textStyle={styles.radioLabel}
                                    checkedColor={Colors.primary}
                                />
                            )
                        })}
                    </ScrollView>
            </View>
        </Overlay>
      </View>
    );
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
    color: Colors.grayLabel, 
    fontWeight: 'normal',
    fontSize: 16
},
radioBackground: {
    backgroundColor: Colors.white, 
    borderColor: Colors.white, 
    marginVertical: 0, 
    borderBottomColor: Colors.grayBackground,
    fontSize: 16
},
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CECED2",
    padding: 8
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#EFEFF4",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10

  },
  inputLeftIcon: {
    color: Colors.pink,
    fontSize: 20,
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  inputStyle: {
    height: 40,
    alignSelf: "flex-start",
    fontSize: 13,
    lineHeight: 15,
    color: "#000",
    flex: 1,
    borderLeftColor: Colors.grayLabel, borderLeftWidth: 0.5
  }
});

export default CupertinoSearchBarBasic;
