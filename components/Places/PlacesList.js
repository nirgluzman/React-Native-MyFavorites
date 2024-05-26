import { FlatList, StyleSheet, Text, View } from 'react-native';

import PlaceItem from './PlaceItem.js';

import { Colors } from '../../constants/colors'; // color palette

export default function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet - start adding some</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places} // array (or array-like list) of items to render.
      keyExtractor={item => item.id} // Used to extract a unique key for a given item at the specified index.
      renderItem={({ item }) => <PlaceItem place={item} />} // function responsible for rendering each individual item in the list.
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
