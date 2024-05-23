import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native'; // React Navigator wrapper
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './screens/AllPlaces.js';
import AddPlace from './screens/AddPlace.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='dark' />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='AllPlaces' component={AllPlaces} />
          <Stack.Screen name='AddPlace' component={AddPlace} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
