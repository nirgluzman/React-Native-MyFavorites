import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // library that provides a Map component that uses Google Maps on Android and Apple Maps or Google Maps on iOS.

export default function Map() {
  const region = {
    // define the center of the map.
    latitude: 37.78,
    longitude: -122.43,
    // size of the map - how much content beside the center will be visible (i.e. zoom level)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  return (
    <MapView
      // https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
      style={styles.map}
      initialRegion={region} // the initial region to be displayed by the map (when it is first loaded).
    ></MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1 // fill the entire screen
  }
});
