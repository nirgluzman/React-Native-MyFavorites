import { FlatList } from 'react-native';

export default function PlacesList({ places }) {
  return (
    <FlatList
      data={places} // array (or array-like list) of items to render.
      keyExtractor={item => item.id} // Used to extract a unique key for a given item at the specified index.
      renderItem={({ item }) => <PlaceItem place={item} />} // function responsible for rendering each individual item in the list.
    />
  );
}
