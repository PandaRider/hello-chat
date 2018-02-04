import { ImagePicker } from 'expo';

const pickImage = async () => {
  console.log('here');
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  console.log(result);

  if (!result.cancelled) {
    this.setState({ uri: result.uri });
  }
};

export default pickImage;
