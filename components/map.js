import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker ,Callout,Polyline } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
//AIzaSyAn703TGP6VQS-0wJWadUCUrknm-GoDPEE
const Map = () => {
    const [lat, setLat] = useState(30.102252)
    const [long, setLong] = useState(31.25444)
    const [margBtm, setMargBtm] = useState(1)
    const points = [
        { latitude: 11.56813, longitude: 104.91037 },
        { latitude: 11.56779, longitude: 104.90666 },]
    const getCurrentLocation =  async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          console.log(
            'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
          );
          return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLat(location.coords.latitude);
        setLong(location.coords.longitude);
      };
    return (
        <View style={styles.container} >
            <MapView style={[styles.map, { flex: 1, marginBottom: margBtm }]}
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.035,
                }}

                onPress={e => { setLat(e.nativeEvent.coordinate.latitude); setLong(e.nativeEvent.coordinate.longitude) }}
                showsUserLocation={true}
                //onPanDrag={e => console.log(e.nativeEvent)}
                followsUserLocation={true}
                showsMyLocationButton={true}

                onRegionChangeComplete={(region) => { setLat(region.latitude); setLong(region.longitude) }}
                onMapReady={() => {

                    setMargBtm(0)
                }}
            >
                   <MapView.Polyline
          coordinates={points}
          strokeWidth={10}
          strokeColor="#000" 
         
          />
           

            </MapView>
            <TouchableOpacity style={styles.currentlocBtn} onPress={getCurrentLocation}>
                <Image source={require('../assets/current.png')} resizeMode='contain' style={{
                    width: "100%",
                    height: "100%"
                }} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: "100%",
        height: "100%",
    },
    map: {
        justifyContent: 'center',
        position: 'absolute',
        height: "100%",
        width: "100%"
    },
    currentlocBtn: {
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        position: "absolute",
        bottom: 5,
        right: 5,
        borderRadius:15
    }


})
export default Map;