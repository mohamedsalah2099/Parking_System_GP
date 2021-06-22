import React ,{useEffect}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignIn from './components/signIn.js';
import SignUp from './components/signUp.js';
import Map from './components/map.js';
export default function App() {
  
 

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.background} colors={['#0f4c5c', 'transparent']} />
    <Map/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#0d1b2a',
    alignItems: 'center',
    justifyContent: 'center',
  },  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 250,
  },
});