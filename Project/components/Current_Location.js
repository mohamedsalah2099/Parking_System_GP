import React, {useState, useEffect} from 'react';
 
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';


const Current_Location = () => {
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('You are Here');

        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        setCurrentLongitude(currentLongitude);
        
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    let watchID = Geolocation.watchPosition(
      (position) => {
        
        setLocationStatus('You are Here');
        console.log(position);

        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        setCurrentLongitude(currentLongitude);

        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>
          <View style={{marginTop: 20}}>
            <Button
              title="Get Your Current Lat & Long"
              onPress={getOneTimeLocation}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Current_Location;
