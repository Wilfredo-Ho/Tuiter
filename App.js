import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, Text} from 'react-native';
import {
  StackNavigator,
  createBottomTabNavigator,
  TabBarBottom
} from 'react-navigation';

import Login from './pages/Login';
import Register from './pages/Register';
import Detail from './pages/Detail';
import Chat from './pages/Chat';
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
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Message: {
    screen: Tab,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  Detail: Detail,
  Chat: {
    screen: Chat,
    navigationOptions: ({navigation}) => ({
      headerTitle: <Text style={{fontWeight: 'bold', fontSize: 16}}>{`和${navigation.state.params.title}聊天`}</Text>,
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      }
    })
  }
}, {
  initialRouteName: 'Login',
  headerMode: 'screen'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
