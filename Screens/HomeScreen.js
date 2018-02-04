import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../Actions';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  componentDidMount() {
    this.getName(this.props);
  }

  getName = async (props) => {
    try {
      let response = await fetch(`https://graph.facebook.com/me?fields=birthday&access_token=${props.token}`);
      let responseJson = await response.json();
      console.log(responseJson.birthday);
      this.setState({ name: responseJson.birthday });
      return responseJson.name;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View>
        <Text> Test Test Deck </Text>
        <Text> Test Test Deck </Text>
        <Text> Test Test Deck </Text>
        <Text> Test Test Deck </Text>
        <Text> Test Test Deck {this.state.name}</Text>
      </View>
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(DeckScreen);
