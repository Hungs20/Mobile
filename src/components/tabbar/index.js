import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Colors, Fonts} from '../../styles';
import CreateRoom from '../../components/rooms/createRoom'
import Home from '../../components/home'
import RoomDetail from '../../components/rooms/detailRoom/RoomDetails'
import Message from '../../components/message'
import Account from '../../components/account'
import Partner from '../../components/partner'
import DistricSearch from '../../components/search/DistricSearch'
import Result from '../search/result'
import Chat from '../../components/message/chat'
import LoveRoom from '../loveRoom/index'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, ThemeProvider, Text } from 'react-native-elements';
import CreateAddressRoom from '../../components/rooms/createRoom/CreateAddressRoom';

function CreateRoomIndex({ navigation }) {
  return (
      <CreateRoom navigation={navigation}/>
  );
}
function HomeRoomIndex({ navigation }) {
  return (
      <Home navigation={navigation}/>
  );
}
function LoveRoomIndex({ navigation }) {
  return (
      <LoveRoom navigation={navigation}/>
  );
}
function AccountIndex({ navigation }) {
  return (
      <Account/>
  );
}
function PartnerIndex({ navigation }) {
  return (
      <Partner/>
  );
}

const Tab = createBottomTabNavigator();


const HomeStack = createStackNavigator();
const MessageStack = createStackNavigator();
const LoveRoomStack = createStackNavigator();
function DistricSearchIndex() {
  return (
      <DistricSearch/>
  );
}
function RoomDetailsIndex({ route, navigation }) {
  return (
    <RoomDetail room = {route.params.room} navigation={navigation}/>
  )
}
function SearchResultIndex({route, navigation}) {
  return (
    <Result querySearch = {route.params.querySearch} navigation={navigation}/>
  )
}
function HomeMessageIndex({route, navigation}) {
  return (
    <Message navigation={navigation}/>
  )
}
function ChatMessageIndex({ route, navigation }) {
  return (
    <Chat authUser={route.params.authUser} navigation={navigation}/>
  )
}
function LoveRoomStackScreen({navigation}) {
  return (
    <LoveRoomStack.Navigator initialRouteName='HomeLoveRoom' screenOptions={{
      headerStyle: {
        backgroundColor: Colors.pink,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: Fonts.headerFontSize
      },
  }}>
    <LoveRoomStack.Screen name="HomeLoveRoom" component={LoveRoomIndex} options={{
        headerShown: false
      }} />
      <LoveRoomStack.Screen name="RoomDetails" component={RoomDetailsIndex}  options={{
          title: 'Th??ng tin ph??ng', 
        }} />
        </LoveRoomStack.Navigator>
  )
}
function MessageStackScreen({navigation}) {
  return (
    <MessageStack.Navigator initialRouteName='HomeMessage' screenOptions={{
      headerStyle: {
        backgroundColor: Colors.pink,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: Fonts.headerFontSize
      },
  }}>
    <MessageStack.Screen name="HomeMessage" component={HomeMessageIndex} options={{
        headerShown: false
      }} />
      <MessageStack.Screen name="ChatMessage" component={ChatMessageIndex}  options={{
          title: 'Tin nh???n ri??ng', 
        }} />
        </MessageStack.Navigator>
  )
}
function HomeStackScreen({navigation}) {
  return (
    <HomeStack.Navigator initialRouteName='Home' screenOptions={{
        headerStyle: {
          backgroundColor: Colors.pink,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: Fonts.headerFontSize
        },
    }}>
      <HomeStack.Screen name="Home" component={HomeRoomIndex} options={{
        headerShown: false
      }} />
      <HomeStack.Screen name="DistricSearch" component={DistricSearchIndex}  options={{
          title: 'T??m ki???m ph??ng', 
        }} />
      <HomeStack.Screen name="RoomDetails" component={RoomDetailsIndex} options={{
          title: 'Th??ng tin chi ti???t', 
        }} />
      <HomeStack.Screen name="CreateRoom" component={CreateRoomIndex} options={{
        title: '????ng th??ng tin ph??ng', 
      }} />
      <HomeStack.Screen name="SearchResult" component={SearchResultIndex} options={{
        title: 'T??m ki???m ph??ng', 
      }} />
      <HomeStack.Screen name="ChatMessage" component={ChatMessageIndex}  options={{
          title: 'Tin nh???n ri??ng', 
        }} />
    </HomeStack.Navigator>
  );
}

const Tabbar = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'T??m ki???m') {
              iconName = focused
                ? 'search-outline'
                : 'search-outline';
            } else if (route.name === '??? gh??p') {
              iconName = focused ? 'people-outline' : 'people-outline';
            } else if (route.name === 'Y??u th??ch'){
              iconName = focused ? 'heart-outline' : 'heart-outline';
            } else if (route.name === 'Tin nh???n'){
              iconName = focused ? 'chatbox-ellipses-outline' : 'chatbox-ellipses-outline';
            } else if (route.name === 'T??i kho???n'){
              iconName = focused ? 'person-outline' : 'person-outline';
            }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.pink,
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="T??m ki???m" component={HomeStackScreen} />
        <Tab.Screen name="Y??u th??ch" component={LoveRoomStackScreen} />
        <Tab.Screen name="??? gh??p" component={PartnerIndex} />
        <Tab.Screen name="Tin nh???n" component={MessageStackScreen} /*options={{ tabBarBadge: 3 }} *//>
        <Tab.Screen name="T??i kho???n" component={AccountIndex} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabbar