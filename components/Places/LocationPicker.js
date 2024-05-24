import { StyleSheet, View } from 'react-native';

import OutlinedButton from '../UI/OutlinedButton';

import { Colors } from '../../constants/colors'; // color palette

export default function LocationPicker() {
  // locating the user using the phone GPS.
  function getLocationHandler() {}

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
