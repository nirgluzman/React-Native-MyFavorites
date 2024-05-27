import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import PlacesList from '../components/Places/PlacesList';

// helper functions to work with SQLite
import { fetchPlaces } from '../util/database';

export default function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [updatePlace, setUpdatePlace] = useState(false);

  const isFocused = useIsFocused(); // check if the screen is focused

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    // check if the screen is focused
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused, updatePlace]);

  return <PlacesList places={loadedPlaces} onPlaceUpdate={setUpdatePlace} />;
}
