import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '../../constants/colors'; // color palette

export default function Button({ onPress, children }) {
  return (
    <Pressable style={pressed => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    borderRadius: 4,
    // shadow effect for Android
    elevation: 2,
    // shadow effect for iOS
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2
  },

  pressed: {
    opacity: 0.7
  },

  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary50
  }
});
