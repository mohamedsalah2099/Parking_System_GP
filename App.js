import React ,{useState, useEffect}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './components/signIn.js';
import SignUp from './components/signUp.js';
import ParkingMap from './components/parkingMap.js';
import {ParkingSlots,ShowContentModal} from './components/ParkingSlots.js';
import YourTicket from './components/YourTicket';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createDrawerNavigator } from '@react-navigation/stack';
 
 
const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();
  export default function App() {
 const[bookedDate,setBookedDate] = useState(0)
  return (
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Map" screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="SignIn" component={SignIn}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="Map" component={ParkingMap}/>
      <Stack.Screen name="ParkingSlot" component={ParkingSlots}/>
      <Stack.Screen name="ShowContentModal" component={ShowContentModal}/>
      <Stack.Screen name="YourTicket" component={YourTicket}/>
    </Stack.Navigator>
      </NavigationContainer>
  );
}



