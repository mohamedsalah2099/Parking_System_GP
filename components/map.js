import React from 'react';
import { StyleSheet, Text, View, TextInput ,TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
const Map = () => {
   
    return (
        <View style={styles.container} >
         <MapView style={styles.map} provider={PROVIDER_GOOGLE}
          region ={{
            latitude: 30.102252,
            longitude: 31.25444,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}
          >
          <MapView.Marker coordinate={{latitude:30.08790150870118,longitude: 31.245301458975927}}
          title="parking1"/>
          </MapView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
      },
      map: {
        width: "100%",
        height: "100%",
      },
})
export default Map;