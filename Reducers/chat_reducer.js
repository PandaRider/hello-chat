import { ADD_MESSAGE, RECEIVE_MESSAGE } from '../Actions/types';

const initialState = [
  {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    }
  },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      if (state.map(m => m._id).includes(action.payload._id)) {
        return state;
      }
      return [
        ...state,
        action.payload
      ];
    case RECEIVE_MESSAGE:
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
}
