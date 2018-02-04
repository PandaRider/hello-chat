import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../Components/Slides';

const SLIDE_DATA = [
  { text: 'Hello World', color: '#03A9F4' },
  { text: 'Sup', color: '#009688' },
  { text: 'Lets get started!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('deck');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete() {
    this.props.navigation.navigate('auth');
  }
  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)} />
    );
  }
}

export default WelcomeScreen;
