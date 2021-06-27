import React ,{useEffect}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './components/signIn.js';
import SignUp from './components/signUp.js';
import ParkingMap from './components/parkingMap.js';
import ParkingSlots from './components/ParkingSlots.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
const Stack = createStackNavigator();
  export default function App() {

  return (
    
  <NavigationContainer>
<Stack.Navigator initialRouteName="SignIn" screenOptions={{
    headerShown: false
  }}>
  <Stack.Screen name="SignIn" component={SignIn}/>
  <Stack.Screen name="SignUp" component={SignUp}/>
  <Stack.Screen name="Map" component={ParkingMap}/>
</Stack.Navigator>
  </NavigationContainer>
    
  );
}



