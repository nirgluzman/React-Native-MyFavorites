// custom oulined button with icon

import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors'; // color palette

export default function OutlinedButton({ onPress, icon, children }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed // conditionally apply 'pressed' style to the button.
      ]}
      onPress={onPress}>
      <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row', // to align icon and text in the same row.
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary500
  },

  pressed: {
    opacity: 0.7
  },

  icon: {
    marginRight: 6 // space between icon and text.
  },

  text: {
    color: Colors.primary500 // color of the text
  }
});
