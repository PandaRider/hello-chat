import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ImageStore } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import b64 from 'base64-js';

class ProfileScreen extends Component {
  state = {
    title: 'gg',
    uri: null
  };

  async componentWillMount() {
    console.log('herehere');
    const inputRef = firebase.storage().ref('/images/test.jpg');
    let uri1 = await inputRef.getDownloadURL();
    console.log(uri1);
    if (uri1) {
      this.setState({ uri: uri1 });
    } else {
      this.setState({ title: 'st' });
    }
    console.log(this.state);
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      base64: true
    });

    console.log(result);
    
    if (!result.cancelled) {
      const imagesRef = firebase.storage().ref('/images');
      const byteArray = b64.toByteArray(result.base64);
      console.log(result);
      console.log(byteArray);
      imagesRef.child('my_pic.jpg').put(byteArray).then(snapshot => {
        console.log('uploaded image!');
      });

      //this.setState({ uri: myURI });
    }
  };

  render() {
    let { uri, title } = this.state;

    return (
    <Card>
      <Avatar
        large
        rounded
        title={title}
        source={{ uri }}
        onPress={this.pickImage}
        activeOpacity={0.7}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text>
            Douheng Pang
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text>
            Name
          </Text>
        </View>
      </View>
    </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
});

export default ProfileScreen;
