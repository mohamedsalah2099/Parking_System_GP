import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker ,Callout } from 'react-native-maps';
import Constants from 'expo-constants';
import OpenMap from "react-native-open-map";
import * as Location from 'expo-location';

const ParkingMap = () => {
    const parkingAreas = [{ coordinate:{latitude: 30.074107720548067, longitude: 31.25213921043556},title: "tahrir Parking"},
        {coordinate: {latitude: 30.064674220822372, longitude:  31.29295170263593} , title:"ramsis parking" },
        {coordinate:{latitude: 30.06165790645091, longitude: 31.35745664947928 },title: "abasia parking"},]
    const [lat, setLat] = useState(30.102252)
    const [long, setLong] = useState(31.25444)
return(
    <View style={styles.container} >
<MapView style={[styles.map, { flex: 1 }]}
                provider={MapView.PROVIDER_GOOGLE}
                region={{
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
            >
                  

                {
                   
                parkingAreas.map((marker,index)=>(
                    <Marker key={index} style={{width:40,height:50}} coordinate={marker.coordinate}
                    title="parking1" >
                        <Image style={{width:"100%",height:"100%"}}  source={require('../assets/parkingSign.png')}/>
                        <Callout>
                            <Text>Alex parking</Text>
                        </Callout>
                        </Marker>
                ))
                 
                }
            </MapView>
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
    }})
export default ParkingMap;