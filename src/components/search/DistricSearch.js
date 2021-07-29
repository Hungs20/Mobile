import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Calendar } from 'react-native-calendars';
import * as Colors from '../../styles/colors';
import { Card, ListItem, Button, CheckBox, Divider, ThemeProvider, Input, Overlay, Avatar , Image, ButtonGroup, colors } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import { color } from "react-native-reanimated";

class DistricSearch extends Component {
  constructor(props){
    super(props);
    this.state = {

      isToggleRoom: false,
      TypeOfRoomSelected: 0,
      listTypeOfRoom: 
      [{name: "Ký túc xá/Homestay", value: "Ký túc xá/Homestay"}, {name: "Phòng cho thuê", value: "Phòng cho thuê"}, 
      {name: "Phòng ở ghép", value: "Phòng ở ghép"},{name: "Nhà nguyên căn", value: "Nhà nguyên căn"},
      {name: "Căn hộ", value: "Căn hộ"}],

      isToggleSex: false,
      TypeOfSex: 0,
      listOfSex: [{name:"Nam", value: "Nam"}, {name: "Nữ", value: "Nữ"}, {name: "Khác", value: "Khác"}],

      isTogglePrice: false,
      TypeOfPrice: 0,
      listOfPrice: [{name:"Dưới 1.000.000VNĐ", value: "Dưới 1.000.000VNĐ"}, {name: "1.000.000 - 2.000.000VNĐ", value: "1.000.000 - 2.000.000VNĐ"}, 
      {name: "2.000.000 - 3.000.000VNĐ", value: "2.000.000-3.000.000VNĐ"},{name: "3.000.000 - 5.000.000VNĐ", value: "3.000.000 - 5.000.000VNĐ"},{name: "Trên 5.000.000VNĐ", value: "Trên 5.000.000VNĐ"}],
      listDistrictSelected: [],
      //isPress: false,

      //touchProps : {
      //  activeOpacity: 1,
      //  underlayColor: 'blue',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
      //  style: this.state.isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
      //  onHideUnderlay: () => this.setState({isPress: false}),
      //  onShowUnderlay: () => this.setState({isPress: true}),
      //  onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
      //}
      

    }
  }
  
  selectDistrict = (array, value) => {
    const indexVl = array.indexOf(value);
    if(indexVl === -1) {
      array.push(value);
    } else {
      array.splice(indexVl, 1);
    }
    this.setState({
      listDistrictSelected: array
    })
  }
  isSelectedDistrict = (array, value) => {
    const indexVl = array.indexOf(value);
    if(indexVl === -1) {
      return false;
    } else {
      return true;
    }
  }


  toggleOverlayRoom = () => {
    console.log("toggle")
      this.setState({isToggleRoom: !this.state.isToggleRoom})
  }

  toggleOverlaySex = () => {
    console.log("toggle")
      this.setState({isToggleSex: !this.state.isToggleSex})
  }

  toggleOverlayPrice = () => {
    console.log("toggle")
      this.setState({isTogglePrice: !this.state.isTogglePrice})
  }
  
  render(){
      //const District1 = [{name: "Đống Đa"},{name: "Thanh Xuân"}, {name: "Long Biên"}, {name:"Ba Đình"}, {name:"Hà Đông"}]
      //const District2 = [{name: "Cầu Giấy"},{name: "Hai Bà Trưng"}, {name: "Hoàn Kiếm"}, {name:"Hoàng Mai"}, {name:"Tây Hồ"}]
      
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.headerStack}>

          <ScrollView style={styles.scrollArea}>
              <View style={styles.whiteBackground}>
                
                <TouchableOpacity style={styles.chonNgay}>
                  <Text style={styles.canPhongTruocNgay}>
                    BẠN CẦN PHÒNG TRƯỚC NGÀY NÀO
                  </Text>
                  <View style={styles.chonNgayTextRow}>
                    <Text style={styles.chonNgayText}>Nhấp để chọn ngày</Text>
                    
                    <View style={styles.chonNgayTextFiller}></View>
                    <EntypoIcon
                      name="chevron-thin-down"
                      style={styles.chonNgayIcon}
                    ></EntypoIcon>
                  </View>
                  <View style={styles.chonNgayLine}></View>
                </TouchableOpacity>



                <TouchableOpacity style={styles.loaiPhong} onPress={this.toggleOverlayRoom}>
                  <Text style={styles._LoaiPhong}>LOẠI PHÒNG</Text>
                  <View style={styles.chonLoaiPhongRow}>
                    <Text style={styles.chonLoaiPhong}>{this.state.listTypeOfRoom[this.state.TypeOfRoomSelected].value}</Text>
                    <View style={styles.chonLoaiPhongFiller}></View>
                    <EntypoIcon
                      name="chevron-thin-down"
                      style={styles.loaiPhongIcon}
                    ></EntypoIcon>
                  </View>
                  <View style={styles.loaiPhongLine}></View>
                </TouchableOpacity>


                <Overlay isVisible={this.state.isToggleRoom} onBackdropPress={()=>this.toggleOverlayRoom}>
                    <View style={{width: 300, maxHeight: 400}}>
                        <Text style={styles.title}>Chọn loại phòng</Text>
                            <ScrollView>
                                {this.state.listTypeOfRoom.map((data,index) => {
                                    return(
                                        <CheckBox
                                            left
                                            key={index}
                                            title={data.name}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={this.state.TypeOfRoomSelected == index}
                                            onPress = {() => this.setState({
                                              TypeOfRoomSelected: index,
                                              isToggleRoom: !this.state.isToggleRoom
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





                <TouchableOpacity style={styles.gioiTinh} onPress={this.toggleOverlaySex}>
                  <Text style={styles._GioiTinh}>GIỚI TÍNH</Text>
                  <View style={styles.chonGioiTinhRow}>
                  <Text style={styles.chonGioiTinh}>{this.state.listOfSex[this.state.TypeOfSex].value}</Text>
                    <View style={styles.chonGioiTinhFiller}></View>
                    <EntypoIcon
                      name="chevron-thin-down"
                      style={styles.gioiTinhIcon}
                    ></EntypoIcon>
                  </View>
                  <View style={styles.gioiTinhLine}></View>
                </TouchableOpacity>


                <Overlay isVisible={this.state.isToggleSex} onBackdropPress={()=>this.toggleOverlaySex}>
                    <View style={{width: 300, maxHeight: 400}}>
                        <Text style={styles.title}>Chọn giới tính</Text>
                            <ScrollView>
                                {this.state.listOfSex.map((data,index) => {
                                    return(
                                        <CheckBox
                                            left
                                            key={index}
                                            title={data.name}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={this.state.TypeOfSex == index}
                                            onPress = {() => this.setState({
                                              TypeOfSex: index,
                                              isToggleSex: !this.state.isToggleSex
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




                <TouchableOpacity style={styles.mucGia} onPress={this.toggleOverlayPrice}>
                  <Text style={styles._MucGia}>MỨC GIÁ</Text>
                  <View style={styles.chonMucGiaRow}>
                  <Text style={styles.chonMucGia}>{this.state.listOfPrice[this.state.TypeOfPrice].value}</Text>
                    <View style={styles.chonMucGiaFiller}></View>
                    <EntypoIcon
                      name="chevron-thin-down"
                      style={styles.mucGiaIcon}
                    ></EntypoIcon>
                  </View>
                  <View style={styles.mucGiaLine}></View>
                </TouchableOpacity>
                
                <Overlay isVisible={this.state.isTogglePrice} onBackdropPress={()=>this.toggleOverlayPrice}>
                    <View style={{width: 300, maxHeight: 400}}>
                        <Text style={styles.title}>Chọn mức giá</Text>
                            <ScrollView>
                                {this.state.listOfPrice.map((data,index) => {
                                    return(
                                        <CheckBox
                                            left
                                            key={index}
                                            title={data.name}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={this.state.TypeOfPrice == index}
                                            onPress = {() => this.setState({
                                              TypeOfPrice: index,
                                              isTogglePrice: !this.state.isTogglePrice
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



                <View style={styles.khuVucStack}>
                  <View style={styles.khuVuc}>
                    <Text style={styles.khuVucText}>KHU VỰC</Text>

                    <View style={styles.buttonRow}>

                      <TouchableOpacity style={styles.button} onPress={()=>this.selectDistrict(this.state.listDistrictSelected, "Đống Đa")}>
                        <View style={ this.isSelectedDistrict(this.state.listDistrictSelected, "Đống Đa") ? styles.quanSelected : styles.quan}>
                          <Text style={this.isSelectedDistrict(this.state.listDistrictSelected, "Đống Đa") ? styles.quanTextSelected : styles.quanText}>Đống Đa</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.button2} onPress={()=>this.selectDistrict(this.state.listDistrictSelected, "Cầu Giấy")}>
                        <View style={this.isSelectedDistrict(this.state.listDistrictSelected, "Cầu Giấy") ? styles.quanSelected : styles.quan}>
                          <Text style={this.isSelectedDistrict(this.state.listDistrictSelected, "Cầu Giấy") ? styles.quanTextSelected : styles.quanText}>Cầu Giấy</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.button3Row}>
                      <TouchableOpacity style={styles.button3} onPress={()=>this.selectDistrict(this.state.listDistrictSelected, "Thanh Xuân")}>
                        <View style={this.isSelectedDistrict(this.state.listDistrictSelected, "Thanh Xuân") ? styles.quanSelected : styles.quan}>
                          <Text style={this.isSelectedDistrict(this.state.listDistrictSelected, "Thanh Xuân") ? styles.quanTextSelected : styles.quanText}>Thanh Xuân</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button4} onPress={()=>this.selectDistrict(this.state.listDistrictSelected, "Hai Bà Trưng")}>
                        <View style={this.isSelectedDistrict(this.state.listDistrictSelected, "Hai Bà Trưng") ? styles.quanSelected : styles.quan}>
                          <Text style={this.isSelectedDistrict(this.state.listDistrictSelected, "Hai Bà Trưng") ? styles.quanTextSelected : styles.quanText}>Hai Bà Trưng</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.button5Row}>
                      <TouchableOpacity style={styles.button5} onPress={()=>this.selectDistrict(this.state.listDistrictSelected, "Long Biên")}>
                        <View style={this.isSelectedDistrict(this.state.listDistrictSelected, "Long Biên") ? styles.quanSelected : styles.quan}>
                          <Text style={this.isSelectedDistrict(this.state.listDistrictSelected, "Long Biên") ? styles.quanTextSelected : styles.quanText}>Long Biên</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button6} onPress={()=>this.selectDistrict(this.state.listDistrictSelected, "Hoàn Kiếm")}>
                        <View style={this.isSelectedDistrict(this.state.listDistrictSelected, "Hoàn Kiếm") ? styles.quanSelected : styles.quan}>
                          <Text style={this.isSelectedDistrict(this.state.listDistrictSelected, "Hoàn Kiếm") ? styles.quanTextSelected : styles.quanText}>Hoàn Kiếm</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.button7Row}>
                      <TouchableOpacity style={styles.button7} onPress={()=>this.selectDistrict(this.state.listDistrictSelected, "Ba Đình")}>
                        <View style={this.isSelectedDistrict(this.state.listDistrictSelected, "Ba Đình") ? styles.quanSelected : styles.quan}>
                          <Text style={this.isSelectedDistrict(this.state.listDistrictSelected, "Ba Đình") ? styles.quanTextSelected : styles.quanText}>Ba Đình</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button8} onPress={()=>this.selectDistrict(this.state.listDistrictSelected, "Hoàng Mai")}>
                        <View style={this.isSelectedDistrict(this.state.listDistrictSelected, "Hoàng Mai") ? styles.quanSelected : styles.quan}>
                          <Text style={this.isSelectedDistrict(this.state.listDistrictSelected, "Hoàng Mai") ? styles.quanTextSelected : styles.quanText}>Hoàng Mai</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.button10Row}>
                      <TouchableOpacity style={styles.button10} onPress={()=>this.selectDistrict(this.state.listDistrictSelected, "Hà Đông")}>
                        <View style={this.isSelectedDistrict(this.state.listDistrictSelected, "Hà Đông") ? styles.quanSelected : styles.quan}>
                          <Text style={this.isSelectedDistrict(this.state.listDistrictSelected, "Hà Đông") ? styles.quanTextSelected : styles.quanText}>Hà Đông</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button9} onPress={()=>this.selectDistrict(this.state.listDistrictSelected, "Tây Hồ")}>
                        <View style={this.isSelectedDistrict(this.state.listDistrictSelected, "Tây Hồ") ? styles.quanSelected : styles.quan}>
                          <Text style={this.isSelectedDistrict(this.state.listDistrictSelected, "Tây Hồ") ? styles.quanTextSelected : styles.quanText}>Tây Hồ</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    
                  </View>
                </View>
              </View>
          </ScrollView>
          
          <View style={styles.header}>
            <View style={styles.headerRec}>
              <Text style={styles.headerText}>Tìm theo nhiều quận</Text>
            </View>
            <View style={styles.headerLine}></View>
          </View>
          
          <View style={styles.footer}>
            <View style={styles.footerRec}>
              <TouchableOpacity style={styles.tim}>
                <View style={styles.timPhongButton}>
                  <Text style={styles.timPhong}>Tìm phòng</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.huy}>
                <View style={styles.huyButton}>
                  <Text style={styles.huyTimKiem}>Hủy</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignSelf: "center"
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(230,230,230,0.6)",
    position: "relative",
    alignSelf: "center",
  },
  header: {
    top: 0,
    height: 51,
    position: "relative",
    width: "100%",
    left: 0
  },
  headerRec: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    position: "relative"
    //borderTopLeftRadius: 11,
    //borderTopRightRadius: 11
  },
  headerText: {
    //fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },
  headerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0,0,0,1)"
  },
  scrollArea: {
    top: 0,
    width: "100%",
    height: 672,
    position: "absolute",
    left: 0
  },
  scrollArea_contentContainerStyle: {
    height: 672,
    width: "100%"
  },
  whiteBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 11,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: 51,
    marginBottom: 100

  },
  chonNgay: {
    width: "100%",
    height: 46,
    marginTop: 20,
    marginLeft: 14
  },
  canPhongTruocNgay: {
    //fontFamily: "roboto-300",
    color: "rgba(133,134,136,1)",
    fontSize: 12
  },
  chonNgayText: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    fontSize: 12
  },
  chonNgayTextFiller: {
    flex: 1,
    flexDirection: "row"
  },
  chonNgayIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 14,
    marginTop: 2,
    marginRight: 30
    
  },
  chonNgayTextRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 7,
    marginRight: 2
  },
  chonNgayLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#E6E6E6",
    marginTop: 2,
    
  },
  loaiPhong: {
    width: "100%",
    height: 42,
    marginTop: 17,
    marginLeft: 14
  },
  _LoaiPhong: {
    //fontFamily: "roboto-300",
    color: "rgba(133,134,136,1)",
    fontSize: 12
  },
  chonLoaiPhong: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    fontSize: 12
  },
  chonLoaiPhongFiller: {
    flex: 1,
    flexDirection: "row"
  },
  loaiPhongIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 14,
    marginTop: 1,
    marginRight: 30
  },
  chonLoaiPhongRow: {
    height: 16,
    flexDirection: "row",
    marginTop: 6,
    marginRight: 2
  },
  loaiPhongLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#E6E6E6",
    marginTop: 3
  },
  gioiTinh: {
    width: "100%",
    height: 39,
    marginTop: 21,
    marginLeft: 14
  },
  _GioiTinh: {
    //fontFamily: "roboto-300",
    color: "rgba(133,134,136,1)",
    fontSize: 12
  },
  chonGioiTinh: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    fontSize: 12
  },
  chonGioiTinhFiller: {
    flex: 1,
    flexDirection: "row"
  },
  gioiTinhIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 14,
    marginRight: 30
  },
  chonGioiTinhRow: {
    height: 15,
    flexDirection: "row",
    marginTop: 6,
    marginRight: 2
  },
  gioiTinhLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#E6E6E6",
    marginTop: 3
  },
  mucGia: {
    width: "100%",
    height: 39,
    marginTop: 21,
    marginLeft: 14
  },
  _MucGia: {
    //fontFamily: "roboto-300",
    color: "rgba(133,134,136,1)",
    fontSize: 12
  },
  chonMucGia: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    fontSize: 12
  },
  chonMucGiaFiller: {
    flex: 1,
    flexDirection: "row"
  },
  mucGiaIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 14,
    marginRight: 30
  },
  chonMucGiaRow: {
    height: 15,
    flexDirection: "row",
    marginTop: 6,
    marginRight: 2
  },
  mucGiaLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#E6E6E6",
    marginTop: 3
  },

  khuVuc: {
    top: 0,
    width: "100%",
    height: 254,
    position: "absolute"
  },
  khuVucText: {
    //fontFamily: "roboto-300",
    color: "rgba(133,134,136,1)",
    fontSize: 12,
    marginLeft: 14
  },
  button: {
    width: 127,
    height: 37
  },
  quanSelected: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 1
  },
  quanTextSelected: {
    //fontFamily: "roboto-regular",
    color: colors.primary,
    marginTop: 10,
    textAlign: "center"
  },
  quan: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8
  },
  quanText: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    marginTop: 10,
    textAlign: "center"
  },
  button2: {
    width: 127,
    height: 37,
    marginLeft: 17
  },
  quan1: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8
  },
  cauGiay: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    marginTop: 10,
    marginLeft: 37
  },
  buttonRow: {
    height: 37,
    flexDirection: "row",
    marginTop: 12,
    
    alignSelf: "center",
  },
  button3: {
    width: 127,
    height: 37
  },
  quan2: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8
  },
  thanhXuan: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    marginTop: 10,
    marginLeft: 27
  },
  button4: {
    width: 127,
    height: 37,
    marginLeft: 16
  },
  quan3: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8
  },
  HaiBaTrung: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    marginTop: 10,
    marginLeft: 25
  },
  button3Row: {
    height: 37,
    flexDirection: "row",
    marginTop: 11,
    alignSelf: "center"
  },
  button5: {
    width: 127,
    height: 37
  },
  quan4: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8
  },
  longBien: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    marginTop: 10,
    marginLeft: 36
  },
  button6: {
    width: 127,
    height: 37,
    marginLeft: 17
  },
  quan5: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8
  },
  hoanKiem: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    marginTop: 10,
    marginLeft: 31
  },
  button5Row: {
    height: 37,
    flexDirection: "row",
    marginTop: 11,
    alignSelf: "center"
  },
  button7: {
    width: 127,
    height: 37
  },
  quan6: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8
  },
  baDinh: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    marginTop: 10,
    marginLeft: 43
  },
  button8: {
    width: 127,
    height: 37,
    marginLeft: 17
  },
  quan7: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8
  },
  hoangMai: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    marginTop: 10,
    marginLeft: 31
  },
  button7Row: {
    height: 37,
    flexDirection: "row",
    marginTop: 11,
    alignSelf: "center",

  },
  button10: {
    width: 127,
    height: 37
  },
  quan8: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8
  },
  haDong: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    marginTop: 10,
    marginLeft: 38
  },
  button9: {
    width: 127,
    height: 37,
    marginLeft: 17
  },
  quan9: {
    width: 127,
    height: 37,
    backgroundColor: "rgba(236,236,236,1)",
    borderRadius: 8
  },
  tayHo: {
    //fontFamily: "roboto-regular",
    color: "rgba(133,134,136,1)",
    marginTop: 10,
    marginLeft: 44
  },
  button10Row: {
    height: 37,
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "center"
  },
  footer: {
    width: "100%",
    height: 112,
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    marginBottom: 50,
    
  },
  footerRec: {
    width: "100%",
    height: 112,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 11,
  },
  tim: {
    width: "80%",
    height: 44,
    marginTop: 14,
    alignSelf: "center",
    
  },
  timPhongButton: {
    width: "100%",
    height: 44,
    backgroundColor: "rgba(40,126,243,1)",
    borderRadius: 11
  },
  timPhong: {
    //fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    marginTop: 11,
    textAlign: "center",
  },
  huy: {
    width: "80%",
    height: 44,
    marginTop: 6,
    alignSelf: "center",
  },
  huyButton: {
    width: "100%",
    height: 44,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 11
  },
  huyTimKiem: {
    //fontFamily: "roboto-regular",
    color: "rgba(40,126,243,1)",
    fontSize: 18,
    marginTop: 8,
    textAlign: "center",
  },
  khuVucStack: {
    width: "100%",
    height: 358,
    marginTop: 18,
    alignSelf: "center",
  },
  headerStack: {
    top: 0,
    width: "100%",
    height: 672,
    alignSelf:"center",
  },
  title : {
    fontSize: 13,
    color: Colors.grayLabel, 
    fontWeight:'bold',
    textTransform: 'uppercase',
    paddingVertical: 10,
    textAlign: "center",
  },
  radioLabel: {
    color: Colors.grayLabel, 
    fontWeight: 'normal',
    fontSize: 14
  },
  radioBackground: {
    backgroundColor: Colors.white, 
    borderColor: Colors.white, 
    marginVertical: 0, 
    borderBottomColor: Colors.grayBackground,
    fontSize: 14
  },
  btnNormal: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: 'blue',
    borderWidth: 1,
    height: 30,
    width: 100,
  }
});

export default DistricSearch;