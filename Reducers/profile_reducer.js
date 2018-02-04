import {
  PROFILE_UPDATE
} from '../Actions/types';

const INITIAL_STATE = {
  name: 'DH',
  avatar: 'https://facebook.github.io/react/img/logo_og.png'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_UPDATE:
      return null;
    default:
      return state;
  }
};
