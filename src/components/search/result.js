import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Chip, IconButton  } from 'react-native-paper';
import { SearchBar, CheckBox, Button, ThemeProvider, ButtonGroup } from 'react-native-elements';
import * as Colors from '../../styles/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import ListTable from '../home/cell/listTable'
import Slider from './slider'
class Result extends Component {
    constructor(props){
        super(props)
        this.state={
            listTypeRoom: [
                {'label': 'Kí túc xá/Homestay', 'value' : 'Kí túc xá/Homestay'}, 
                {'label': 'Phòng cho thuê', 'value' : 'Phòng cho thuê'}, 
                {'label': 'Phòng ở ghép', 'value' : 'Phòng ở ghép'}, 
                {'label': 'Nhà nguyên căn', 'value' : 'Nhà nguyên căn'}, 
                {'label': 'Căn hộ', 'value' : 'Căn hộ'}
            ],
            searchQuery: this.props.querySearch ?? '',
            isFilterCost: false,
            isFilterExtension: false,
            isFilterTypeRoom: false,
            isFilterNumRoom: false,
            isFilterSort: false,

            isToggleFilter: null,
            filterCost: [0.5,15],
            listExtChecked: [],
            filterTypeRoom: null,
            filterNumRoom: null,
            filterGender: 0,
            genderButtons : ['Tất cả', 'Nam', 'Nữ'],
            filterSort: 'Mới nhất',
            listRoom:[],
        }
    }
    _isMounted = false;
    componentDidMount() {
        this._isMounted = true;
        var subscriber = firestore().collection('rooms')
        if(this.state.isFilterExtension == true && this.state.listExtChecked.length > 0)
        {
            subscriber = subscriber.where('extension.listExtChecked', 'array-contains-any',this.state.listExtChecked)
        }
        if(this.state.isFilterTypeRoom == true && this.state.filterTypeRoom != null) {
            subscriber = subscriber.where('info.typeRoom', '==', this.state.filterTypeRoom)
        }
        if(this.state.isFilterNumRoom == true && this.state.filterNumRoom != null) {
            subscriber = subscriber.where('info.numPersonOfRoom', '==', this.state.filterNumRoom)
            subscriber = subscriber.where('info.gender', '==', this.state.genderButtons[this.state.filterGender])
        }
        if(this.state.isFilterCost){
            subscriber = subscriber.where('info.giathue', '>=', this.state.filterCost[0]*1000000)
            subscriber = subscriber.where('info.giathue', '<=', this.state.filterCost[1]*1000000)
        }
        if(this.state.isFilterSort){
           if(this.state.filterSort === 'Mới nhất'){
                subscriber = subscriber.orderBy('date_create', "desc")
           }
           else if(this.state.filterSort === 'Giá thấp đến cao'){
            subscriber = subscriber.orderBy('info.giathue', "asc")
               
            }
           else {
            subscriber = subscriber.orderBy('info.giathue', "desc")
           } 
        }
        // subscriber.get().then(querySnapshot => {
        //     querySnapshot.forEach(doc => {
        //        console.log(doc.data());
        //     });
            
        
        //   }).catch(err => {
        //      console.log('Error getting documents', err);
        //   });
        // /// remove
        subscriber.onSnapshot(querySnapshot => {
        var rooms = [];

        querySnapshot.forEach(documentSnapshot => {
            const roomData = {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            }
            if(this.state.searchQuery != ''){
                if((roomData.address.namePhuong != null && roomData.address.namePhuong.toLowerCase().includes(this.state.searchQuery.toLowerCase())) ||
                (roomData.address.nameQuan != null && roomData.address.nameQuan.toLowerCase().includes(this.state.searchQuery.toLowerCase())) ||
                (roomData.address.nameCity != null && roomData.address.nameCity.toLowerCase().includes(this.state.searchQuery.toLowerCase())) ||
                (roomData.confirm.title != null && roomData.confirm.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                ){
                    rooms.push(roomData)
                }
            } else {
                rooms.push(roomData)
            }
        })
       // console.log(rooms)
        if(this._isMounted){
            this.setState({listRoom: rooms, isToggleFilter: null,})
        }
        },error => {
            console.log(error)
        });
    // Unsubscribe from events when no longer in use
    () => subscriber();


    }
    componentWillUnmount() {
        this._isMounted = false;
      }

     doSearch = async () => {
        var subscriber = firestore().collection('rooms')

        if(this.state.isFilterExtension == true && this.state.listExtChecked.length > 0)
        {
            subscriber = subscriber.where('extension.listExtChecked', 'array-contains-any',this.state.listExtChecked)
        }
        if(this.state.isFilterTypeRoom == true && this.state.filterTypeRoom != null) {
            subscriber = subscriber.where('info.typeRoom', '==', this.state.filterTypeRoom)
        }
        if(this.state.isFilterNumRoom == true && this.state.filterNumRoom != null) {
            subscriber = subscriber.where('info.numPersonOfRoom', '==', this.state.filterNumRoom)
            subscriber = subscriber.where('info.gender', '==', this.state.genderButtons[this.state.filterGender])
        }
        if(this.state.isFilterCost){
            subscriber = subscriber.where('info.giathue', '>=', this.state.filterCost[0]*1000000)
            subscriber = subscriber.where('info.giathue', '<=', this.state.filterCost[1]*1000000)
        }
        if(this.state.isFilterSort){
           if(this.state.filterSort === 'Mới nhất'){
                subscriber = subscriber.orderBy('date_create', 'desc')
           }
           else if(this.state.filterSort === 'Giá thấp đến cao'){
            subscriber = subscriber.orderBy('info.giathue', "asc")
            
        }
           else {
            subscriber = subscriber.orderBy('info.giathue', "desc")
           } 
        }
        
        // subscriber.get().then(querySnapshot => {
        //     var rooms = [];
        //     querySnapshot.forEach(doc => {
        //        console.log(doc.data());
        //        rooms.push(doc.data())
        //     });
        //     this.setState({listRoom: rooms, isToggleFilter: null,})
        
        //   }).catch(err => {
        //      console.log('Error getting documents', err);
        //   });

          //remove
        subscriber.onSnapshot(querySnapshot => {
        var rooms = [];

        querySnapshot.forEach(documentSnapshot => {
            const roomData = documentSnapshot.data()
            if(this.state.searchQuery != ''){
                if((roomData.address.namePhuong != null && roomData.address.namePhuong.toLowerCase().includes(this.state.searchQuery.toLowerCase())) ||
                (roomData.address.nameQuan != null && roomData.address.nameQuan.toLowerCase().includes(this.state.searchQuery.toLowerCase())) ||
                (roomData.address.nameCity != null && roomData.address.nameCity.toLowerCase().includes(this.state.searchQuery.toLowerCase())) ||
                (roomData.confirm.title != null && roomData.confirm.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                ){
                    rooms.push(roomData)
                    console.log(roomData)
                }
            } else {
                rooms.push(roomData)
            } 
        })
         this.setState({listRoom: rooms, isToggleFilter: null,})
        
        },error => {
            console.log(error)
        });
    // Unsubscribe from events when no longer in use
    () => subscriber();

    }

    onChangeSearch = (query) => {
        this.setState({searchQuery: query});
        this.doSearch()
    }
    showResultFilter = (id) => {
        return(
            <View key={id}>
                <Text style={{fontSize: 18, marginVertical: 10, marginHorizontal: 10}}>{this.state.listRoom.length} Kết quả</Text>
                <ScrollView>
                    <View style={{flex:1, marginHorizontal: 10}}>
                        <View style={{flex: 1, flexDirection: 'column'}}> 
                        {
                            this.state.listRoom.map((room, index) => (
                                <ListTable key={index} room={room} navigation={this.props.navigation}/>
                            ))
                        }
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    showViewFilter = () => {
        return(
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Button title="Giá " type="clear" iconRight={true} 
                        icon={<Icon
                        name={this.state.isToggleFilter==="gia" ? "angle-down" : "angle-up"}
                        size={20}
                        color={this.state.isFilterCost || this.state.isToggleFilter==="gia" ? Colors.primary : Colors.grayLabel}
                        />} 
                        titleStyle={this.state.isFilterCost || this.state.isToggleFilter==="gia" ? styles.filterItemSelected : styles.filterItem}
                        onPress={()=>this.setToggle('gia')}
                    />

                    <Button title="Tiện ích " type="clear" iconRight={true} 
                        icon={<Icon
                            name={this.state.isToggleFilter==="tienich" ? "angle-down" : "angle-up"}
                            size={20}
                        color={this.state.isFilterExtension || this.state.isToggleFilter==="tienich" ? Colors.primary : Colors.grayLabel}
                        />} 
                        titleStyle={this.state.isFilterExtension || this.state.isToggleFilter==="tienich" ? styles.filterItemSelected : styles.filterItem}
                        onPress={()=>this.setToggle('tienich')}
                    />
                    <Button title="Loại phòng " type="clear" iconRight={true} 
                    icon={<Icon
                        name={this.state.isToggleFilter==="loaiphong" ? "angle-down" : "angle-up"}
                        size={20}
                    color={this.state.isFilterTypeRoom || this.state.isToggleFilter==="loaiphong" ? Colors.primary : Colors.grayLabel}
                        />} 
                        titleStyle={this.state.isFilterTypeRoom || this.state.isToggleFilter==="loaiphong" ? styles.filterItemSelected : styles.filterItem}
                        onPress={()=>this.setToggle('loaiphong')}
                    />

                <Button title="Số người " type="clear" iconRight={true} 
                    icon={<Icon
                        name={this.state.isToggleFilter==="songuoi" ? "angle-down" : "angle-up"}
                        size={20}
                    color={this.state.isFilterNumRoom || this.state.isToggleFilter==="songuoi" ? Colors.primary : Colors.grayLabel}
                        />} 
                        titleStyle={this.state.isFilterNumRoom || this.state.isToggleFilter==="songuoi" ? styles.filterItemSelected : styles.filterItem}
                        onPress={()=>this.setToggle('songuoi')}
                    />
                    <Button title="Sắp xếp " type="clear" iconRight={true} 
                    icon={<Icon
                        name={this.state.isToggleFilter==="sapxep" ? "angle-down" : "angle-up"}
                        size={20}
                    color={this.state.isFilterSort || this.state.isToggleFilter==="sapxep" ? Colors.primary : Colors.grayLabel}
                    />} 
                    titleStyle={this.state.isFilterSort || this.state.isToggleFilter==="sapxep" ? styles.filterItemSelected : styles.filterItem}
                    onPress={()=>this.setToggle('sapxep')}
                    />
                </ScrollView>
        )
    }
    onChangeCost = (cost) => {this.setState({filterCost: cost, isFilterCost: true})}
    addExtChecked = (array, value) => {
        var index = array.indexOf(value)
        if (index === -1) array.push(value);
        else array.splice(index, 1);
        this.setState({listExtChecked: array})
        if(array.length > 0) {
            this.setState({isFilterExtension: true})
        } else {
            this.setState({isFilterExtension: false})
        }
      }
    showNumRoomIndex = (id) => {
        const buttons = ['Tất cả', 'Nam', 'Nữ'];
        return(
            <View key={id}>
            <View style={{flex: 1, flexDirection: "row", alignItems:"center", justifyContent: "space-between", marginHorizontal: 15}}>
                <Text style={{fontSize: 15, flex: 2, color: Colors.grayLabel}}>Số người</Text>
                <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                <IconButton icon="minus-circle"
                    color={Colors.primary}
                    size={30}
                    onPress={() => this.setState({filterNumRoom: this.state.filterNumRoom ? this.state.filterNumRoom - 1 : 0, isFilterNumRoom: true})}
                />
                <Text style={{fontSize: 15}}>{this.state.filterNumRoom ?? 0}</Text>
                <IconButton icon="plus-circle"
                    color={Colors.primary}
                    size={30}
                    onPress={() => this.setState({filterNumRoom: this.state.filterNumRoom ? this.state.filterNumRoom+1 : 1, isFilterNumRoom: true})}
                />
                </View>
            </View>
            <View style={{flex: 1, flexDirection: "row", alignItems:"center", marginHorizontal: 15}}>
                <Text style={{fontSize: 15, flex: 1, color: Colors.grayLabel}}>Giới tính</Text>
                <View style={{flex: 2, flexDirection: "row", alignItems: "center"}}>
                <ButtonGroup
                    onPress={(value)=>this.setState({filterGender: value})}
                    selectedIndex={this.state.filterGender}
                    buttons={this.state.genderButtons}
                    containerStyle={{width: 200}}
                />
                </View>
            </View>
            </View>
            
        )
    }
    showSortIndex = (id) => {
        const sorts = ["Mới nhất", "Giá thấp đến cao", "Giá cao xuống thấp"]
       return(
            sorts.map((data,index) => {
                return(
                    <CheckBox
                        left
                        key={index}
                        title={data}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.filterSort == data}
                        onPress = {() =>this.setState({filterSort: data, isFilterSort: true})}
                        containerStyle={styles.radioBackground}
                        textStyle={this.state.filterSort == data ? styles.radioLabelSelected : styles.radioLabel}
                        checkedColor={Colors.primary}
                    />
                )
            })
        )
    }
    showTypeRoomIndex = (id) => {
        return(
            this.state.listTypeRoom.map((data,index) => {
                return(
                    <CheckBox
                        left
                        key={data.value}
                        title={data.label}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.filterTypeRoom == data.value}
                        onPress = {() =>this.setState({filterTypeRoom: data.value, isFilterTypeRoom: true})}
                        containerStyle={styles.radioBackground}
                        textStyle={this.state.filterTypeRoom == data.value ? styles.radioLabelSelected : styles.radioLabel}
                        checkedColor={Colors.primary}
                    />
                )
            })
        )
    }
    showExtensionIndex = (id) => {
        const exts = [{name: 'WC riêng',icon: 'toilet'},{name: 'Cửa sổ', icon: 'window-open-variant'}, {name: 'Wifi', icon: 'wifi'}, {name:'Chủ riêng',icon:'account-key-outline'}, {name:'Máy nước nóng',icon:'water-boiler'}, {name:'Tủ lạnh',icon:'fridge-outline'}, {name:'Gác lửng',icon:'stairs'}, {name:'Tủ đồ',icon:'locker'}, {name:'Thú cưng', icon:'dog'}]
        const exts2 = [{name: 'Chỗ để xe',icon: 'motorbike'},{name: 'An ninh', icon: 'security'}, {name: 'Tự do', icon: 'clock-outline'}, {name:'Máy lạnh',icon:'air-conditioner'}, {name:'Nhà bếp',icon:'chef-hat'}, {name:'Máy giặt',icon:'washing-machine'}, {name:'Giường',icon:'bed-outline'}, {name:'Tivi',icon:'television'}, {name:'Ban công', icon:'window-shutter'}]
       
        return(
            <View  key={id} style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                  {exts.map((data, index) => {
                      return (
                        <CheckBox
                        key={index}
                        title={data.name}
                        iconType='material-community'
                        checkedIcon={data.icon}
                        uncheckedIcon={data.icon}
                        containerStyle={this.state.listExtChecked.indexOf(data.name) === -1 ? styles.extensionButton : styles.extensionButtonSelected}
                        textStyle={this.state.listExtChecked.indexOf(data.name) === -1 ? styles.extensionText : styles.extensionTextSelected}
                        size={17}
                        checkedColor={Colors.primary}
                        checked={this.state.listExtChecked.indexOf(data.name) === -1 ? false : true}
                        onPress={() => this.addExtChecked(this.state.listExtChecked, data.name)}
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
                          containerStyle={this.state.listExtChecked.indexOf(data.name) === -1 ? styles.extensionButton : styles.extensionButtonSelected}
                          textStyle={this.state.listExtChecked.indexOf(data.name) === -1 ? styles.extensionText : styles.extensionTextSelected}
                          size={17}
                          checkedColor={Colors.primary}
                          checked={this.state.listExtChecked.indexOf(data.name) === -1 ? false : true}
                          onPress={() => this.addExtChecked(this.state.listExtChecked, data.name)}
                      />
                      )
                  })}
                </View>
            </View>
        )
    }
    showCostIndex = (id) => {
        return(
            <View key={id}>
                <Slider changeCost={this.onChangeCost}/>
                
            </View>
        )
    }
    showButtonSearch = (id) => {
        return(
            <View key={id}>
                <Button title="Áp dụng" onPress={()=>this.doSearch()} containerStyle={{marginHorizontal: 35, borderColor: Colors.primary, borderWidth: 1, borderRadius: 10, marginVertical: 20}}/>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: Colors.grayLabel, alignItems: "center", textAlign: "center", marginHorizontal: 20}}>Vui lòng chọn yêu cầu, sau đó bấm áp dụng để tìm kiếm!</Text>
            </View>
        )
    }
    showToggle = () => {
        var listView = [];
        switch(this.state.isToggleFilter){
            case 'gia':
                 listView.push(this.showCostIndex('gia'))
                 break;
            case 'tienich':
                 listView.push(this.showExtensionIndex('tienich'))
                 break;
            case 'loaiphong':
                listView.push(this.showTypeRoomIndex('loaiphong'))
                break;
            case 'songuoi':
                listView.push(this.showNumRoomIndex('songuoi'))
                break;
            case 'sapxep':
                listView.push(this.showSortIndex('sapxep'))
                break;
        }
        listView.push(this.showButtonSearch('search'))
        return (<ScrollView>{listView}</ScrollView>)
    }
    setToggle = (value) => {
        if(this.state.isToggleFilter === value){
            this.setState({isToggleFilter: null})
        }
        else {
            this.setState({isToggleFilter: value})
        }
    }
    showChip = () => {
        return(
            <View style={{flexDirection:"row", alignItems:"center", justifyContent: "space-between"}}>
            {
                (this.state.isFilterCost || this.state.isFilterExtension || this.state.isFilterNumRoom || this.state.isFilterTypeRoom || this.state.isFilterSort) ? 
                    <IconButton icon="close"
                        color={Colors.grayLabel}
                        size={20}
                        animated={true}
                        style={{ borderColor: Colors.primary, borderWidth: 1}}
                        onPress={() => {
                            this.setState({
                            isFilterCost: false,
                            isFilterExtension: false,
                            isFilterNumRoom: false,
                            isFilterTypeRoom: false,
                            isFilterSort: false,
                            listExtChecked: []
                        });
                        if(this.state.isToggleFilter == null){
                            this.doSearch()
                        }
                    }
                    }/>
                : null
            }
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    this.state.isFilterCost ? <Chip key={'cost'} mode='outlined' onClose={async()=>{await this.setState({isFilterCost: false});if(this.state.isToggleFilter == null){
                        this.doSearch()
                    }}}>{this.state.filterCost[0]} triệu VND - {this.state.filterCost[1]} triệu VND</Chip> : null
                }
                {
                    this.state.isFilterExtension ? this.state.listExtChecked.map((value, index) => {
                        return(<Chip key={`ext${index}`} mode='outlined' onClose={async()=>{await this.addExtChecked(this.state.listExtChecked, value);if(this.state.isToggleFilter == null){
                            this.doSearch()
                        }}}>{value}</Chip>)
                    }) : null
                }
                {
                    this.state.isFilterTypeRoom ? <Chip key={'type'} mode='outlined' onClose={async()=>{await this.setState({isFilterTypeRoom: false});if(this.state.isToggleFilter == null){
                        this.doSearch()
                    }}}>{this.state.filterTypeRoom}</Chip> : null
                }
                {
                    this.state.isFilterNumRoom ? <Chip key={'num'} mode='outlined' onClose={async()=>{await this.setState({isFilterNumRoom: false});if(this.state.isToggleFilter == null){
                        this.doSearch()
                    }}}>{this.state.filterNumRoom} {this.state.genderButtons[this.state.filterGender]}</Chip> : null
                }
                {
                    this.state.isFilterSort ? <Chip key={'sort'} mode='outlined' onClose={async()=>{await this.setState({isFilterSort: false});if(this.state.isToggleFilter == null){
                        this.doSearch()
                    }}}>{this.state.filterSort}</Chip> : null
                }
                
            </ScrollView>
            </View>
            )
    }
    render(){
        return(
            <ThemeProvider>
                <SearchBar
                    placeholder="Tìm theo quận, tên đường, địa điểm"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                    inputStyle={{fontSize: 15}}
                    selectionColor={Colors.primary}
                    clearIcon
                    searchIcon={false}
                    round={true}
                    showLoading={true}
                    lightTheme={true}
                    inputContainerStyle={{height: 35}}
                   />
                <View>{this.showViewFilter()}</View>
                <View>{this.showChip()}</View>
                {
                    this.state.isToggleFilter !== null ? this.showToggle() : this.showResultFilter()
                }
                
            </ThemeProvider>
        )
    }
}
const styles = StyleSheet.create({
    filterItemSelected: {
        color: Colors.primary
    },
    filterItem: {
        color: Colors.grayLabel
    },
    extensionButtonSelected:{borderColor: Colors.primary, borderWidth: 1, borderRadius: 10},
    extensionButton:{borderColor: Colors.grayBackground, borderWidth: 0, borderRadius: 10},
    extensionTextSelected:{fontSize: 14, color: Colors.primary, fontWeight: 'normal'},
    extensionText:{fontSize: 14, color: Colors.grayLabel, fontWeight: 'normal'},
    radioLabel: {
        color: Colors.grayLabel, 
        fontWeight: 'normal',
        fontSize: 16
    },
    radioLabelSelected: {
        color: 'black', 
        fontWeight: 'normal',
        fontSize: 16
    },
    radioBackground: {
       // backgroundColor: Colors.white, 
       // borderColor: Colors.white, 
        marginVertical: 0, 
       // borderBottomColor: Colors.grayBackground,
        fontSize: 16
    },
})
export default Result;