import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const Map = () => {
    const [lat, setLat] = useState(30.102252)
    const [long, setLong] = useState(31.25444)
    const [margBtm, setMargBtm] = useState(1)
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
                <Marker coordinate={{ latitude: lat, longitude: long }}
                    title="parking1" />

            </MapView>
            <TouchableOpacity style={styles.currentlocBtn}>
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