import { useState, useLayoutEffect, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // library that provides a Map component that uses Google Maps on Android and Apple Maps or Google Maps on iOS.

import IconButton from '../components/UI/IconButton';

export default function Map({ route, navigation }) {
  // get the previous route name.
  const routes = navigation.getState()?.routes;
  const previousRoute = routes[routes.length - 2];
  const previousRouteName = previousRoute.name;

  // route params hold the initial location coordinates.
  const initialLocation = {
    lat: route.params.initialLat,
    lng: route.params.initialLng
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    // define the center of the map.
    latitude: initialLocation.lat,
    longitude: initialLocation.lng,
    // Delta = size of the map - how much content beside the center will be visible (i.e. zoom level)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  // event handler that is called when the user clicks on the map.
  function selectLocationHandler(event) {
    // if the previous route is PlaceDetails, then we want to disable the click option.
    if (previousRouteName === 'PlaceDetails') {
      return null;
    }

    // coordinates of the selected location.
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  }

  // useCallback for optimized performance: prevents unnecessary re-renders.
  // Memoizes a callback function: ensures it only re-evaluates when dependencies change.
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!'
      );
      return;
    }

    // navigate to the AddPlace screen and pass the picked location as a parameter.
    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng
    });
  }, [navigation, selectedLocation]);

  // the code inside useLayoutEffect is processed before the component is displayed;
  // fires before the browser repaints the screen.
  useLayoutEffect(() => {
    // if the previous route is PlaceDetails, then we do not need to display the 'save' button.
    if (previousRouteName === 'PlaceDetails') {
      return;
    }

    // set the headerRight button to the 'save' icon.
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton icon='save' size={24} color={tintColor} onPress={savePickedLocationHandler} />
      )
    });
  }, [navigation, savePickedLocationHandler, previousRouteName]);

  return (
    <MapView
      // https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
      style={styles.map}
      initialRegion={region} // the initial region to be displayed by the map (when it is first loaded).
      onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title='Picked Location'
          coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1 // fill the entire screen
  }
});
