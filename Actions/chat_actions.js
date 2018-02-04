import * as firebase from 'firebase';

import { ADD_MESSAGE } from '../Actions/types';

export const addMessage = (msg) => ({
    type: ADD_MESSAGE,
    payload: msg
});

export const sendMessage = (message, roomKey) => (dispatch) => {
  let FBmsg = {
    text: message.text,
    createdAt: message.createdAt,        //or use firebase.database.ServerValue.TIMESTAMP
    sender: message.user.name
  };
  const newMsgRef = firebase.database()
                            .ref('ChatRooms/')
                            .child(roomKey)
                            .push();
  FBmsg.key = newMsgRef.key; //for assigning id prop as firebase database's key (Probably redundant)
  newMsgRef.set(FBmsg);

  message._id = newMsgRef.key;
  dispatch(addMessage(message));
};

const receiveMessages = (messages) => (dispatch) => {
    //convert to Gifted-Chat message object
    // "array-like object" convert to "object-only array" passes object in each iteration
    Object.values(messages).forEach(msg => {
      let giftedMsg = {
        _id: msg.key,
        text: msg.text,
        createdAt: msg.createdAt,
        user: {
          _id: 2,
          name: msg.sender,
        }
      };
      dispatch(addMessage(giftedMsg));
    }
  );

    //dispatch(receivedMessages());
  };

//first fetch
export const fetchMessages = (roomKey) => (dispatch) => {
  firebase.database()
          .ref('ChatRooms')
          .child(roomKey)
          .orderByKey()
          .limitToLast(20)
          .on('value', (snapshot) => {
              // gets around Redux panicking about actions in reducers
              setTimeout(() => {
                  const messages = snapshot.val() || [];

                  dispatch(receiveMessages(messages));
              }, 0);
          });
};
