import { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // library that provides a Map component that uses Google Maps on Android and Apple Maps or Google Maps on iOS.

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    // define the center of the map.
    latitude: 37.78,
    longitude: -122.43,
    // Delta = size of the map - how much content beside the center will be visible (i.e. zoom level)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  // event handler that is called when the user clicks on the map.
  function selectLocationHandler(event) {
    // coordinates of the selected location.
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  }

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
