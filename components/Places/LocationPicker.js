import { Alert, StyleSheet, View } from 'react-native';

import {
  getCurrentPositionAsync, // requests for one-time delivery of the user's current location.
  useForegroundPermissions, // check or request permissions for the foreground location.
  PermissionStatus, // Enum with available permission statuses.
  Accuracy // Enum with available location accuracies.
} from 'expo-location';

import OutlinedButton from '../UI/OutlinedButton';

import { Colors } from '../../constants/colors'; // color palette

export default function LocationPicker() {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  async function verifyPermissions() {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      // User hasn't granted or denied the permission yet.
      const permissionResponse = await requestPermission();

      // return the granted permission status by the User.
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      // User has denied the permission.
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }

    // User has granted the permission.
    return true;
  }

  // locating the user using the phone GPS.
  async function getLocationHandler() {
    // check if the user has granted permission.
    const hasPermission = await verifyPermissions();

    // if the user hasn't granted permission, return - we cannot proceed.
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync({
      accuracy: Accuracy.Highest // the accuracy of the location, https://docs.expo.dev/versions/latest/sdk/location/#accuracy
    });
    console.log(location);
  }

  // allow the user to pick a location on the map.
  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>

      <View style={styles.actions}>
        <OutlinedButton icon='location' onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>

        <OutlinedButton icon='map' onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },

  actions: {
    flexDirection: 'row', // place the two buttons side by side.
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
