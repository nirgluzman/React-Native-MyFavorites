import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import PlacesList from '../components/Places/PlacesList.js';

export default function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused(); // check if the screen is focused

  useEffect(() => {
    if (isFocused && route.params) {
      // check if the screen is focused and there are params
      const { place } = route.params;
      setLoadedPlaces(currentPlaces => [place, ...currentPlaces]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}
