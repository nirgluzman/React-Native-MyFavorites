import { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  useNavigation, // get access to 'navigation' object.
  useRoute, // get access to 'route' object (i.e. route parameters).
  useIsFocused // check if the current screen is focused.
} from '@react-navigation/native';

import {
  getCurrentPositionAsync, // requests for one-time delivery of the user's current location.
  useForegroundPermissions, // check or request permissions for the foreground location.
  PermissionStatus, // Enum with available permission statuses.
  Accuracy // Enum with available location accuracies.
} from 'expo-location';

import OutlinedButton from '../UI/OutlinedButton';

import {
  getMapPreview, // helper function to generate a URL for a static Google Maps image.
  getAddress // helper function for reverse geocoding (translating a location on the map into a human-readable address).
} from '../../util/location';

import { Colors } from '../../constants/colors'; // color palette

export default function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState(null);

  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  const isFocused = useIsFocused(); // this hook returns a boolean indicating whether the screen is currently focused or not.

  const navigation = useNavigation();
  const route = useRoute();

  // update map preview when the picked location changes.
  useEffect(() => {
    // get the picked location from the route parameters.
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

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
        'You need to grant location permissions to use this app.',
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

  // locating the user using the device GPS.
  async function getDeviceLocation() {
    // check if the user has granted permission.
    const hasPermission = await verifyPermissions();

    // if the user hasn't granted permission, return - we cannot proceed.
    if (!hasPermission) {
      return;
    }

    const deviceLocation = await getCurrentPositionAsync({
      accuracy: Accuracy.Highest // the accuracy of the location, https://docs.expo.dev/versions/latest/sdk/location/#accuracy
    });

    return deviceLocation;
  }

  async function getLocationHandler() {
    // get the device location.
    const location = await getDeviceLocation();

    setPickedLocation({
      lat: location.coords.latitude, // latitude
      lng: location.coords.longitude // longitude
    });
  }

  // allow the user to pick a location on the map.
  async function pickOnMapHandler() {
    // get the device location.
    const location = await getDeviceLocation();

    navigation.navigate('Map', {
      initialLat: location.coords.latitude,
      initialLng: location.coords.longitude
    });
  }

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image} // we must set width & height in order to show the image.
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} // image source (either a remote URL or a local file resource).
      />
    );
  }

  // pass the picked location to PlaceForm (parent component).
  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
        onPickLocation({ ...pickedLocation, address });
      }
    }
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>

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
    borderRadius: 4,
    overflow: 'hidden' // hide the image if it is larger than the container.
  },

  actions: {
    flexDirection: 'row', // place the two buttons side by side.
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  image: {
    width: '100%',
    height: '100%'
    // borderRadius: 4
  }
});
