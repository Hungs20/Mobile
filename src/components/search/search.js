import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import CupertinoSearchBarBasic from "./CupertinoSearchBarBasic";
import * as Colors from '../../styles/colors'
import { SliderBox } from "react-native-image-slider-box";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DistricSearch from "./DistricSearch";
import 'react-native-gesture-handler';
const images = [
  require('../../data/img/intro1.jpg'),
  require('../../data/img/intro2.png'),          // Local image
];



class Search extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.sliderStack}>
          <View style={styles.slider}>
          <SliderBox
            images={images}
            sliderBoxHeight={300}
            dotColor={Colors.blue}
            inactiveDotColor={Colors.white}
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
          />
          </View>
          
            <View style={styles.wholeSearchBox}>
              <View style={styles.searchBox}>
                <View style={styles.topSearchBox}></View>
                <View style={styles.bottomSearchBox}></View>
                <CupertinoSearchBarBasic
                  style={styles.cupertinoSearchBarBasic}
                  navigation={this.props.navigation}
                ></CupertinoSearchBarBasic>

              
                <TouchableOpacity style={styles.districSearch} onPress={()=> this.props.navigation.navigate('DistricSearch')}>
                  <View style={styles.districtIcon}>
                    <Image style={styles.districtIcon} source={require('../../data/icon/TimTheoQuan.png')} />
                  </View>
                  <Text style={styles.districText}>Tìm theo{"\n"}nhiều quận</Text>
                </TouchableOpacity>
            
                
                <TouchableOpacity style={styles.nearYouSearch}>
                  <View style={styles.nearYou}>
                  <Image style={styles.nearYou} source={require('../../data/icon/TimGanBan.png')} />
                  
                  </View>
                  <Text style={styles.nearYouText}>
                  Tìm gần nơi{"\n"}học &amp; làm
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.postRoom} onPress={()=> this.props.navigation.navigate('CreateRoom')}>
                  <View style={styles.postRoomIcon}>
                  <Image style={styles.postRoomIcon} source={require('../../data/icon/DangPhong.png')} />
                  
                  </View>
                  <Text style={styles.postRoomText}>Đăng{"\n"}phòng dễ</Text>
                </TouchableOpacity>
              </View>
            </View>
          
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
  },
  slider: {
    top: 0,
    height: 247,
    position: "absolute",
    backgroundColor: "rgba(236,236,236,1)",
    left: 0,
    right: 0
  },
  wholeSearchBox: {
    top: 198,
    width: 330,
    height: 193,
    alignSelf: "center",
    position: "absolute"
  },
  searchBox: {
    width: 330,
    height: 193,
    backgroundColor: "#E6E6E6",
    borderRadius: 24,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 6,
    shadowOpacity: 0.19,
    shadowRadius: 2
  },
  topSearchBox: {
    flex: 0.33,
    backgroundColor: "rgba(255,255,255,1)",
    margin: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  bottomSearchBox: {
    flex: 0.68,
    backgroundColor: "rgba(246,244,244,1)",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    margin: 0
  },
  cupertinoSearchBarBasic: {
    height: 46,
    width: 310,
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "#fff"
  },
  districSearch: {
    top: 91,
    left: 33,
    width: 50,
    height: 81,
    position: "absolute"
  },
  districtIcon: {
    width: 49,
    height: 49,
    backgroundColor: "rgba(255,168,49,1)",
    borderRadius: 20
  },
  districText: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    fontSize: 10,
    textAlign: "center",
    marginTop: 8
  },
  nearYouSearch: {
    top: 91,
    width: 60,
    height: 81,
    position: "absolute",
    alignSelf: "center"
  },
  nearYou: {
    width: 49,
    height: 49,
    backgroundColor: "rgba(0,214,131,1)",
    borderRadius: 20,
    alignSelf: "center",
    marginLeft: 1
  },
  nearYouText: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    fontSize: 10,
    textAlign: "center",
    marginTop: 8
  },
  postRoom: {
    top: 91,
    right: 33,
    width: 49,
    height: 81,
    position: "absolute"
  },
  postRoomIcon: {
    width: 49,
    height: 49,
    backgroundColor: "rgba(255,49,128,1)",
    borderRadius: 20
  },
  postRoomText: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    fontSize: 10,
    textAlign: "center",
    marginTop: 8,
    marginLeft: 2
  },
  sliderStack: {
    height: 391
  }
});

export default Search;
