//For avoiding arrow-function performance issues
import React, { Component } from 'react';
import { ListItem, Thumbnail, Text, Body } from 'native-base';
import * as actions from '../Actions';

export default class RenderProfiles extends Component {
  onPress() {
    this.props.startChat(this.props.data.roomKey);
    this.props.navigation.navigate('Chat');
  }
  render() {
    return (
      <ListItem button onPress={this.onPress}>
        <Thumbnail square size={80} source={{ url: this.props.data.url }} />
          <Body>
            <Text>{this.props.data.name}</Text>
            <Text note>{this.props.data.text}</Text>
          </Body>
      </ListItem>
    );
  }
}
