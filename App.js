import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native'; // React Navigator wrapper
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// the SplashScreen module from the expo-splash-screen library is used to tell the splash screen to remain visible until it has been explicitly told to hide.
import * as SplashScreen from 'expo-splash-screen';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import PlaceDetails from './screens/PlaceDetails';

import IconButton from './components/UI/IconButton';

// helper functions to work with SQLite
import { initDB } from './util/database';

import { Colors } from './constants/colors'; // color palette

const Stack = createNativeStackNavigator();

// keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  // state to keep track of whether we're in DB init stage so we can display the splash screen during that time.
  const [dbInitialized, setDbInitialized] = useState(false);

  // SQLite initialization whenever the app is launched.
  useEffect(() => {
    async function init() {
      try {
        await initDB();
        setDbInitialized(true); // Database initialized successfully.
      } catch (err) {
        console.log(err);
      }
    }

    init();
  }, []);

  // show the splash screen until we complete DB initialization.
  if (!dbInitialized) {
    return null; // return null to display the splash screen.
  } else {
    // hide the splash screen.
    SplashScreen.hideAsync();
  }

  return (
    <>
      <StatusBar style='dark' />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // default options to use for the screens in the navigator.
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}>
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              // function which returns a React Element to display on the right side of the header.
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon='add'
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              )
            })}
          />
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{
              title: 'Add a new Place'
            }}
          />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{
              title: 'Place Details'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
