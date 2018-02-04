import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, PICK_MATCH } from '../Actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    case PICK_MATCH:
      return { roomKey: action.payload };
    default:
      return state;
  }
}
