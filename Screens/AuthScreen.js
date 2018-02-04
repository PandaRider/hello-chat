import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import * as actions from '../Actions';


class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    AsyncStorage.removeItem('fb_token');
    this.onAuthComplete(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }
  onAuthComplete(props) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log('We are authenticated now!');
      }
    });

    if (props.token) {
      this.props.navigation.navigate('profile');
      console.log(props.token);
    }
  }

  render() {
    return (
      <View>
        <Text> Test Test Auth </Text>
        <Text> Test Test Auth </Text>
        <Text> Test Test Auth </Text>
        <Text> Test Test Auth </Text>
        <Text> Test Test Auth </Text>
      </View>
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
