import Expo from 'expo';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';

import WelcomeScreen from './Screens/WelcomeScreen';
import AuthScreen from './Screens/AuthScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AllChatsScreen from './Screens/AllChatsScreen';
import ChatScreen from './Screens/ChatScreen';
import HomeScreen from './Screens/HomeScreen';

import store from './Store';

const firebaseConfig = {
  apiKey: 'AIzaSyBFiBF0bXTobjmwaLB32RRj1padyOuuqok',
  authDomain: 'flutter-world.firebaseapp.com',
  databaseURL: 'https://flutter-world.firebaseio.com',
  //projectId: 'flutter-world',
  storageBucket: 'flutter-world.appspot.com',
  //messagingSenderId: '912487254733'
};

class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          home: { screen: HomeScreen },
          chat: {
            screen: StackNavigator({
              AllChats: { screen: AllChatsScreen },
              Chat: { screen: ChatScreen }
            })
          },
          profile: { screen: ProfileScreen }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


Expo.registerRootComponent(App);
