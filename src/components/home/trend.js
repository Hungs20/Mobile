import React, {Component} from 'react'
import {View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity} from 'react-native'
import * as Colors from '../../styles/colors'

class Trend extends Component {
    constructor(props){
        super(props)
        this.state = {
            items : [
                { name: 'Hai Bà Trưng', uri: require('../../data/Quan/haibatrung.jpg') },
                { name: 'Cầu Giấy', uri: require('../../data/Quan/caugiay.jpg') },
                { name: 'Đống Đa', uri: require('../../data/Quan/dongda.jpg') },
                { name: 'Nam Từ Liêm', uri: require('../../data/Quan/namtuliem.jpg') },
                { name: 'Bắc Từ Liêm', uri: require('../../data/Quan/bactuliem.jpg') },
                { name: 'Hoàng Mai', uri: require('../../data/Quan/hoangmai.jpg') },
            ]
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Text style={styles.title}>Xu hướng tìm kiếm</Text>
                {
                    this.state.items.map((item, index) => {
                        if(index % 3 === 0){
                            return (
                                <View key={index} style={{flex: 1, flexDirection: 'row'}}> 
                                    <TouchableOpacity style={styles.image} onPress={()=>this.props.navigation.navigate('SearchResult', {querySearch: this.state.items[index].name})}>
                                    <ImageBackground key={this.state.items[index].name} source={this.state.items[index].uri} style={{width: "100%", height:"100%"}} imageStyle={{borderRadius: 10}}>
                                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'center'}}>
                                            <Text style={{fontWeight: 'bold', color: "white"}}>{this.state.items[index].name}</Text>
                                        </View>
                                    </ImageBackground>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.image} onPress={()=>this.props.navigation.navigate('SearchResult', {querySearch: this.state.items[index+1].name})}>
                                    <ImageBackground key={this.state.items[index+1].name} source={this.state.items[index+1].uri} style={{width: "100%", height:"100%"}} imageStyle={{borderRadius: 10}}>
                                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'center'}}>
                                            <Text style={{fontWeight: 'bold', color: "white"}}>{this.state.items[index+1].name}</Text>
                                        </View>
                                    </ImageBackground>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.image} onPress={()=>this.props.navigation.navigate('SearchResult', {querySearch: this.state.items[index+2].name})}>
                                    <ImageBackground key={this.state.items[index+2].name} source={this.state.items[index+2].uri} style={{width: "100%", height:"100%"}} imageStyle={{borderRadius: 10}}>
                                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'center'}}>
                                            <Text style={{fontWeight: 'bold', color: "white"}}>{this.state.items[index+2].name}</Text>
                                        </View>
                                    </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    image: {
        flex:1, borderRadius: 10, margin: 5, height: 100,
    
    },
    title : {
        fontSize: 14,
        color: 'black', 
        fontWeight:'bold',
        paddingVertical: 10,
        paddingLeft: 8
    },
  })
export default Trend;