import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, List, ListItem, Thumbnail, Text, Body } from 'native-base';

import * as actions from '../Actions';
import RenderProfiles from '../Components/RenderProfiles';

class AllChatsScreen extends Component {
  static navigationOptions = {
    title: 'Chats'
  };
  constructor(props) {
    super(props);
    this.state = {
      profiles: [{ id: 111, name: 'Tom', text: 'I am first', roomKey: '123' },
      { id: 222, name: 'Dick', text: 'I am second', roomKey: '456' },
      { id: 333, name: 'Harry', text: 'I am third', roomKey: '789' }]
    };
  }

  renderProfiles = profile => {
    return (
      <RenderProfiles data={profile} />
    );
  }

  render() {
    return (
      <Container>
        <List
          dataArray={this.state.profiles}
          renderRow={this.renderProfiles}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    roomKey: state.auth.roomKey
  };
}

export default connect(mapStateToProps, actions)(MatchScreen);
