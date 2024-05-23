// ImagePicker provides access to the system's UI for selecting images and videos from the phone's library or taking a photo with the camera.
// https://docs.expo.dev/versions/latest/sdk/imagepicker/

import { Button, View } from 'react-native';

import {
  launchCameraAsync // display the system UI for taking a photo with the camera.
} from 'expo-image-picker';

export default function ImagePicker() {
  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true, // whether to show a UI to edit the image after it is picked.
      aspect: [16, 9], // aspect ratio to maintain if the user is allowed to edit the image (by passing allowsEditing: true).
      quality: 0.5 // specify the quality of compression, from 0 to 1; we want to limit the quality/image size.
    });
  }

  return (
    <View>
      <View></View>
      <Button title='Take Image' onPress={takeImageHandler} />
    </View>
  );
}
