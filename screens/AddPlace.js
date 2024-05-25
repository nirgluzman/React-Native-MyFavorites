import PlaceForm from '../components/Places/PlaceForm';

export default function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    // navigate to 'AllPlaces' screen and pass the 'place' as a route params.
    navigation.navigate('AllPlaces', {
      place
    });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
