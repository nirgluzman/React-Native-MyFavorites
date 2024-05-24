import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

import { Colors } from '../../constants/colors'; // color palette

export default function PlaceForm() {
  const [enteredTitle, setEneteredTitle] = useState('');

  function changeTitleHandler(enteredText) {
    setEneteredTitle(enteredText);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1, // takes all the available space possible.
    flexDirection: 'column', // default is 'column'.
    padding: 24
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },

  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
});
