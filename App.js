import React ,{useState, useEffect}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './components/signIn.js';
import SignUp from './components/signUp.js';
import ParkingMap from './components/parkingMap.js';
import Root from './components/Root'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

 
const Stack = createStackNavigator();

//const Drawer = createDrawerNavigator();
  export default function App() {
 
  return (
    
    <NavigationContainer>
    <Stack.Navigator  headerMode={false}>
      <Stack.Screen name="SignIn" component={SignIn}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="Root" component={Root}/>
    </Stack.Navigator>
    
      </NavigationContainer>
  );
}



