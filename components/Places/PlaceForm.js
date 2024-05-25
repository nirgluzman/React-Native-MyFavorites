import { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';

import { Colors } from '../../constants/colors'; // color palette

export default function PlaceForm() {
  const [enteredTitle, setEneteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setEneteredTitle(enteredText);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed.
  // this is to prevent unnecessary re-creation of the callback function on every re-render.
  // with an empty dependency array ([]), pickLocationHandler will be created only once, even if the component itself re-renders due to other state or prop changes.
  // by memoizing pickLocationHandler with useCallback and an empty dependency array, we ensure that child component (LocationPicker) that receive it as a prop will
  // only re-render if pickedLocation itself changes, not due to a new function reference - see useEffect block.
  const pickLocationHandler = useCallback(location => setPickedLocation(location), []);

  function savePlaceHandler() {
    console.log(enteredTitle, selectedImage, pickedLocation);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
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
