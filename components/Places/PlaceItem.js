import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors'; // color palette

export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={onSelect}>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    // shadow effect for Android.
    elevation: 2,
    // shadow effect for iOS.
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2
  },

  pressed: {
    // visual feedback when item is pressed.
    opacity: 0.9
  },

  image: {
    flex: 1, // 'info' is twice as big as the 'image' (Note: 'info' and 'image' are siblings).
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100
  },

  info: {
    flex: 2, // 'info' is twice as big as the 'image' (Note: 'info' and 'image' are siblings).
    padding: 12
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700
  },

  address: {
    fontSize: 12,
    color: Colors.gray700
  }
});
