import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import CountDown from 'react-native-countdown-component';
import QRCode from 'react-native-qrcode-generator';
import { LinearGradient } from 'expo-linear-gradient';
export default function YourTicket({ route }) {
    const [seconds,setSeconds] = useState( 0)
    const [qrString,setQrString] = useState("")
    
   
    useEffect(() => {
      console.log(route.params.TicketDate)
     
       setQrString(route.params.TicketDate+route.params.parkingName+ route.params.slotIndex);
        lockOrientation()
      
    } )
   
    const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      }
    return (
      <View style={styles.container}>
      <LinearGradient style={styles.background} colors={['#0f4c5c', 'transparent']} />
      <View style={{marginVertical:50}}>
        <CountDown
        
        size={30}
        until={route.params.countDown}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
      </View>
      <View style={{justifyContent:"center",alignItems:"center"}}>
        <QRCode
          value={qrString}
          size={300}
          bgColor='black'
          fgColor='white'/>
          </View>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#0d1b2a',
    width:"100%",
    height:"100%",
 
  },  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 250,
  }})