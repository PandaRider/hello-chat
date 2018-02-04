import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import * as firebase from 'firebase';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

export const facebookLogin = () => async (dispatch) => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error);
    });
    //Dispatch an action saying that login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async (dispatch) => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('1913518172251957', {
    permissions: ['public_profile', 'user_birthday']
  });
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  AsyncStorage.setItem('fb_token', token);
  const credential = firebase.auth.FacebookAuthProvider.credential(token);
  firebase.auth().signInWithCredential(credential).catch((error) => {
      console.log(error);
  });
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
