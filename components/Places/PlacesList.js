import { FlatList, StyleSheet, Text, View } from 'react-native';

import {
  useNavigation // get access to 'navigation' object.
} from '@react-navigation/native';

import PlaceItem from './PlaceItem.js';

import { deletePlace } from '../../util/database'; // helper functions to work with SQLite.

import { Colors } from '../../constants/colors'; // color palette.

export default function PlacesList({ places, onPlaceUpdate }) {
  const navigation = useNavigation();

  // navigate to 'PlaceDetails' screen when a place is selected.
  function selectPlaceHandler(id) {
    navigation.navigate('PlaceDetails', { placeId: id });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet - start adding some</Text>
      </View>
    );
  }

  async function deletePlaceHandler(id) {
    onPlaceUpdate(false);
    await deletePlace(id);
    onPlaceUpdate(true);
  }

  return (
    <FlatList
      style={styles.list}
      data={places} // array (or array-like list) of items to render.
      keyExtractor={item => item.id} // Used to extract a unique key for a given item at the specified index.
      renderItem={(
        { item } // function responsible for rendering each individual item in the list.
      ) => <PlaceItem place={item} onSelect={selectPlaceHandler} onDelete={deletePlaceHandler} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24
  },

  fallbackContainer: {
    flex: 1, // takes up the entire screen
    justifyContent: 'center',
    alignItems: 'center'
  },

  fallbackText: {
    fontSize: 16,
    color: Colors.primary200
  }
});
