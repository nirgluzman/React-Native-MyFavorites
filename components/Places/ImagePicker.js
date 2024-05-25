// ImagePicker provides access to the system's UI for selecting images and videos from the phone's library or taking a photo with the camera.
// https://docs.expo.dev/versions/latest/sdk/imagepicker/

import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

import {
  launchCameraAsync, // display the system UI for taking a photo with the camera.
  useCameraPermissions, // check if the user has granted permission to use the camera.
  PermissionStatus // enum of possible permission statuses, returned by useCameraPermissions(); see https://docs.expo.dev/versions/latest/sdk/imagepicker/#permissionstatus
} from 'expo-image-picker';

import OutlinedButton from '../UI/OutlinedButton.js';

import { Colors } from '../../constants/colors'; // color palette

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState(null);

  const [cameraPermissionInformation, requestPermission] = useCameraPermissions(); // executed only once when the component mounts.

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      // User hasn't granted or denied the permission yet.
      const permissionResponse = await requestPermission();

      // return the granted permission status by the User.
      return permissionResponse.granted; // granted = boolean that indicates if the permission is granted.
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      // User has denied the permission.
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [
          // array of buttons to display.
          { onPress: async () => await requestPermission() }
        ]
      );
      return false;
    }

    // User has granted the permission.
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    // if the user hasn't granted permission, return - we cannot proceed.
    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true, // whether to show a UI to edit the image after it is picked.
      aspect: [16, 9], // aspect ratio to maintain if the user is allowed to edit the image (by passing allowsEditing: true).
      quality: 0.5 // specify the quality of compression, from 0 to 1; we want to limit the quality/image size.
    });

    // store the image uri in state.
    setPickedImage(image.assets[0].uri);
  }

  // image preview - if no image is picked, display a message.
  let imagePreview = <Text>No image picked yet</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image
        style={styles.image} // we must set width & height in order to show the image.
        source={{ uri: pickedImage }} // image source (either a remote URL or a local file resource).
      />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon='camera' onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden' // hide the image if it is larger than the container.
  },

  image: {
    width: '100%',
    height: '100%'
  }
});
