import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, ViewPagerAndroid} from 'react-native';
import {
  StackNavigator,
  createBottomTabNavigator,
  TabBarBottom
} from 'react-navigation';

import Login from './pages/Login';
import HomeScreen from './pages/Home';
import MessageScreen from './pages/Message';
import CommunityScreen from './pages/Community';
import MineScreen from './pages/Mine';

const Tab = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Message: {
      screen: MessageScreen
    },
    Community: {
      screen: CommunityScreen
    },
    Mine: {
      screen: MineScreen
    }
  }, {
    tabBarPosition: 'bottom',
    switchEnable: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: '#4BC1D2',
      inactiveTintColor: '#999',
      upperCaseLabel: false,
      pressColor: '#788493',
      pressOpacity: 0.8,
      style: {
        backgroundColor: '#fff',
        paddingBottom: 1,
        borderTopWidth: 0.2,
        paddingTop: 1,
        borderTopColor: '#ccc',
      },
      labelStyle: {
        fontSize: 11,
        margin: 1
      },
      indicatorStyle: { height: 0}
    }
  }
);

const App = StackNavigator({
  Login: Login,
  Home: {
    screen: Tab,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }
}, {
  initialRouteName: 'Home',
  headerMode: 'screen'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});

export default App;
