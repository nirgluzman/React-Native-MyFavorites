// ImagePicker provides access to the system's UI for selecting images and videos from the phone's library or taking a photo with the camera.
// https://docs.expo.dev/versions/latest/sdk/imagepicker/

import { Alert, Button, View } from 'react-native';

import {
  launchCameraAsync, // display the system UI for taking a photo with the camera.
  useCameraPermissions, // check if the user has granted permission to use the camera.
  PermissionStatus // enum of possible permission statuses, returned by useCameraPermissions(); see https://docs.expo.dev/versions/latest/sdk/imagepicker/#permissionstatus
} from 'expo-image-picker';

export default function ImagePicker() {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      // User hasn't granted or denied the permission yet.
      const permissionResponse = await requestPermission();

      // return the granted permission status by the User.
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      // User has denied the permission.
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.'
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

    console.log(image);
  }

  return (
    <View>
      <View></View>
      <Button title='Take Image' onPress={takeImageHandler} />
    </View>
  );
}
