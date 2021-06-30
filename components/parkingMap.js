import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker ,Callout } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { getPreciseDistance} from 'geolib';
import Modal from 'react-native-modal';
import OpenMap from "react-native-open-map";
import { useNavigation } from '@react-navigation/native';
 
 
const ShowModal = (status)=>{
    console.log(status.message)
    const navigation = useNavigation()
    return(
    <Modal
    isVisible={status.status}
    animationInTiming={2000}
    animationOutTiming={2000}
    backdropTransitionInTiming={2000}
    backdropTransitionOutTiming={2000}
  >
    <View style={styles.modalContent}>
    <Text style={{fontSize:18,color:"#0d1b2a",fontWeight:"bold"}}>{status.message}</Text>
    <Image source={require('../assets/animatedParking.gif')} resizeMode='contain' style={{width:"100%"}} />
    <View style={{flexDirection:"row"}}>
    <TouchableOpacity style={styles.button} onPress={()=>{status.setStatus(false); openExternalMap(status.parking)}}>
  <Text style={{fontSize:16,fontWeight:"bold"}}>Direction</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={()=>{status.setStatus(false);navigation.navigate('ParkingSlots')}}>
  <Text style={{fontSize:16,fontWeight:"bold"}}>Open parking</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={()=>status.setStatus(false)}>
  <Text style={{fontSize:16,fontWeight:"bold"}}>Cancel</Text>
</TouchableOpacity>
</View>
</View>
  </Modal>)
}
const openExternalMap = (parking)=>{
    OpenMap.show({
        latitude: parking.coordinate.latitude,
        longitude: parking.coordinate.longitude,
        title: parking.title,
        cancelText: 'Close',
        actionSheetTitle: 'Chose app',
        actionSheetMessage: 'Available applications '
      });
}
const ParkingMap = () => {
     
    const parkingAreas = [{coordinate: {latitude: 30.064674220822372, longitude:  31.29295170263593} , title:"ramsis parking" ,slots:5,ticketCost:"7 LE"},
    {coordinate:{latitude: 30.06165790645091, longitude: 31.35745664947928 },title: "abasia parking",slots:7,ticketCost:"5 LE"},
    { coordinate:{latitude: 30.074107720548067, longitude: 31.25213921043556},title: "tahrir Parking",slots:3,ticketCost:"10 LE"},]
    const [lat, setLat] = useState(30.102252)
    const [long, setLong] = useState(31.25444)
    const [index,setIndex]= useState(0)
    const [enableModal,setEnableModal]=useState(false)
    const getNearestParking=({navigation})=>{
        let distances =[];
        parkingAreas.map(marker=>{
            const dist = getPreciseDistance({latitude:lat,longitude:long},marker.coordinate)
            distances.push(dist)
        })
        let min = distances[0]
        let  index = 0
       for(let i=0;i<distances.length;i++){
           if(distances[i]<min){
           min=distances[i]
        index=i}
           
       }
       setIndex(index)
       setEnableModal(true)
       console.log(enableModal)
       
      
    }
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
                     
                  <Marker style={{width:40,height:50}} coordinate={{ latitude: lat, longitude: long }} >
                        
                        </Marker>
                {
                    
                    parkingAreas.map((marker,index)=>(
                        <Marker key={index} style={{width:40,height:50}} coordinate={marker.coordinate}
                        title="parking1" >
                        <Image style={{width:"100%",height:"100%"}}  source={require('../assets/parkingSign.png')}/>
                        <MapView.Callout onPress={()=>{setEnableModal(true);setIndex(index)}}>
                        <View style={{ width: 200 }}>
                    <Text>{marker.title}</Text>
                     <Text>Available slots : {marker.slots}</Text>
                     <Text>Ticket cost : {marker.ticketCost}</Text>
                      
                  </View>
                        </MapView.Callout>
                        </Marker>
                ))
                
            }
             
            </MapView>
            <TouchableOpacity style={styles.currentlocBtn} onPress={getCurrentLocation}>
                <Image source={require('../assets/current.png')} resizeMode='contain' style={{
                    width: "100%",
                    height: "100%"
                }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.NearparkBtn} onPress={getNearestParking} >
                <Text style={{color:"#fff",fontSize:16}}>get Nearest Parking</Text>
            </TouchableOpacity>
       
            <ShowModal status={enableModal} setStatus={setEnableModal} message={ parkingAreas[index].title} parking={parkingAreas[index]}/>
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
    },currentlocBtn: {
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        position: "absolute",
        bottom: 5,
        right: 5,
        borderRadius:15
    },NearparkBtn:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "#0d1b2a",
        width: 150,
        height: 50,
        position: "absolute",
        bottom: 5,
        right: 60,
        borderRadius:15
    },button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },})
   
    export default ParkingMap;