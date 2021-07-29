import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList} from 'react-native';

class Partner extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data_partners: [
        {
            id:'1',
            user_id: 'trongtinh_Rc0LjZ54yj',
            user_name: 'THU PHUONG',
            user_avatar: "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-600x600.jpg",
            sender_id: 'trongtinh_Rc0LjZ54yj',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
        },
        {
            id:'2',
            user_id: 'huynhnhu_R3J4WUoWXJ',
            user_name: 'HUYNH NHU',
            user_avatar: "https://vanhienblog.info/wp-content/uploads/2019/02/anh-gai-xinh-dep-hot-girl-1-00.jpg",
            sender_id: 'trongthanh_O7xyqYRvo1',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
            
        },
        {
            id:'3',
            user_id: 'trongthat_IlpBApYmye',
            user_name: 'LAN PHUONG',
            user_avatar: "https://yte24h.org/wp-content/uploads/2020/02/hot_girl_nude.jpg",
            sender_id: 'trongthat_IlpBApYmye',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
        },
        {
            id:'4',
            user_id: 'trongthat_IlpBApYmye',
            user_name: 'TRONG THAT',
            user_avatar: "https://i2.wp.com/johnothecoder.uk/wp-content/uploads/sites/11/2018/12/Mafia-Online-Avatar-600x600.jpg?fit=600%2C600&ssl=1",
            sender_id: 'trongthat_IlpBApYmye',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
        },
        {
            id:'5',
            user_id: 'trongthat_IlpBApYmye',
            user_name: 'TRONG THAT',
            user_avatar: "https://i2.wp.com/johnothecoder.uk/wp-content/uploads/sites/11/2018/12/Mafia-Online-Avatar-600x600.jpg?fit=600%2C600&ssl=1",
            sender_id: 'trongthat_IlpBApYmye',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
        },
        {
            id:'6',
            user_id: 'trongthat_IlpBApYmye',
            user_name: 'TRONG THAT',
            user_avatar: "https://i2.wp.com/johnothecoder.uk/wp-content/uploads/sites/11/2018/12/Mafia-Online-Avatar-600x600.jpg?fit=600%2C600&ssl=1",
            sender_id: 'trongthat_IlpBApYmye',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
        },
        {
            id:'7',
            user_id: 'trongthat_IlpBApYmye',
            user_name: 'TRONG THAT',
            user_avatar: "https://i2.wp.com/johnothecoder.uk/wp-content/uploads/sites/11/2018/12/Mafia-Online-Avatar-600x600.jpg?fit=600%2C600&ssl=1",
            sender_id: 'trongthat_IlpBApYmye',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
        },
        {
            id:'8',
            user_id: 'trongthat_IlpBApYmye',
            user_name: 'TRONG THAT',
            user_avatar: "https://i2.wp.com/johnothecoder.uk/wp-content/uploads/sites/11/2018/12/Mafia-Online-Avatar-600x600.jpg?fit=600%2C600&ssl=1",
            sender_id: 'trongthat_IlpBApYmye',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
        },
        {
            id:'9',
            user_id: 'trongthat_IlpBApYmye',
            user_name: 'TRONG THAT',
            user_avatar: "https://i2.wp.com/johnothecoder.uk/wp-content/uploads/sites/11/2018/12/Mafia-Online-Avatar-600x600.jpg?fit=600%2C600&ssl=1",
            sender_id: 'trongthat_IlpBApYmye',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
        },
        {
            id:'10',
            user_id: 'trongthat_IlpBApYmye',
            user_name: 'TRONG THAT',
            user_avatar: "https://i2.wp.com/johnothecoder.uk/wp-content/uploads/sites/11/2018/12/Mafia-Online-Avatar-600x600.jpg?fit=600%2C600&ssl=1",
            sender_id: 'trongthat_IlpBApYmye',
            priceRange: '1.000.000VND - 3.000.000VND',
            searchingLocation: 'Cau Giay'
        }
      ]
    }
  }

  renderItem = ({item}) => {
    let {cardText, card, cardImage} = styles
    return (
        <TouchableOpacity style = {card}>
          <View style = {styles.ImageBox}>
            <Image style = {cardImage}  source = {{uri: item.user_avatar}}/>
            <Text style = {cardText}>DETAIL</Text>
          </View>
          <View style = {styles.partnerInfo}>
            <Text style = {styles.cardText2}>{item.user_name}</Text>
            <Text style = {styles.cardText3}>Price range</Text>
            <Text style = {styles.cardText4}>{item.priceRange}</Text>
            <Text style = {styles.cardText3}>Searching location</Text>
            <Text style = {styles.cardText4}>{item.searchingLocation}</Text>
            
          </View>
        </TouchableOpacity>
    )
  }
  
  ItemSeparatorComponent = () => {
    return (
        <View style = {{
            height: 1,
            paddingVertical: 10
        }}/>
    )
  }
  render() {
    let {container, loader} = styles  
    
    return (
      <View style = {styles.container}>
        <Text style = {styles.title}>Search Roomates</Text>
        <FlatList 
          data = {this.state.data_partners}
          renderItem = {this.renderItem}
          keyExtractor = {(item) => item.id}
          ItemSeparatorComponent = {this.ItemSeparatorComponent}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 30
  },
  ImageBox: {
    flex: 1
  },
  partnerInfo: {
    flex: 2
  },
  cardText: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    marginLeft: 25
  },
  cardText2 :{
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
    paddingBottom: 10
  },
  cardText3:{
    marginLeft: 10,
    paddingBottom: 10
  },
  cardText4:{
    fontWeight: 'bold',
    marginLeft: 10,
    paddingBottom: 10
  },
  card: {
    flexDirection: "row",
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardImage: {
    width: '100%',
    height: 130,
    resizeMode: 'stretch'
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default Partner;