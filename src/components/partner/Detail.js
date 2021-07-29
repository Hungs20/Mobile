import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList} from 'react-native';

class PartnerDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      detail_partners: [
        {
            id:'1',
            user_id: 'trongtinh_Rc0LjZ54yj',
            user_name: 'THU PHUONG',
            user_avatar: "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-600x600.jpg",
            sender_id: 'trongtinh_Rc0LjZ54yj',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
        }
      ]
    }
  }

  renderItem = ({item}) => {
    return (
        // <TouchableOpacity style = {card}>
        //   <View style = {styles.ImageBox}>
        //     <Image style = {cardImage}  source = {{uri: item.user_avatar}}/>
        //     <Text style = {cardText}>DETAIL</Text>
        //   </View>
        //   <View style = {styles.partnerInfo}>
        //     <Text style = {styles.cardText2}>{item.user_name}</Text>
        //     <Text style = {styles.cardText3}>Price range</Text>
        //     <Text style = {styles.cardText4}>{item.priceRange}</Text>
        //     <Text style = {styles.cardText3}>Searching location</Text>
        //     <Text style = {styles.cardText4}>{item.searchingLocation}</Text>
            
        //   </View>
        // </TouchableOpacity>
    )
  }
  
  render() { 
    
    return (
      <View style = {styles.container}>
        <Text style = {styles.title}></Text>
        <View
          data = {this.state.detail_partners}
          renderItem = {this.renderItem}
          keyExtractor = {(item) => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})
export default PartnerDetail;