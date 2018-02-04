import React, { Component } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { connect } from 'react-redux';

import * as actions from '../Actions';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.renderBubble = this.renderBubble.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }
      ]
    });
    this.props.fetchMessages('123');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.messages);
  }

  setCustomText(text) {
    this.setState({ text });
  }

  sendMessage(messages) {
    //format into message object
    let message = {
      _id: 2,               //temp
      text: messages[0].text,
      createdAt: Date.now(),
      user: {
        _id: 2,                        //this.props.accountID,     //temp
        name: this.props.profile.name,
        avatar: this.props.profile.avatarURL,
      },
      image: null
    };
    this.props.sendMessage(message, '123');
    this.setState({ text: '' });            //probably optional. Just in case?
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.props.messages}
        //text={this.props.text}
        onSend={(messages) => this.sendMessage(messages)}
        user={{ _id: 1 }}
        //onInputTextChanged={(text) => this.setCustomText(text)}
        renderBubble={this.renderBubble}
      />
    );
  }

}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    profile: state.profile,
    roomKey: state.roomKey
  };
}

export default connect(mapStateToProps, actions)(ChatScreen);
