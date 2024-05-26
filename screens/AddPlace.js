import PlaceForm from '../components/Places/PlaceForm';

// helper functions to work with SQLite
import { insertPlace } from '../util/database';

export default function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    // insert the place into the database.
    await insertPlace(place);

    // navigate to 'AllPlaces' screen.
    navigation.navigate('AllPlaces');
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
