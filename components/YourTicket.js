import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import CountDown from 'react-native-countdown-component';
import QRCode from 'react-native-qrcode-generator';
export default function YourTicket({ route }) {
    const [seconds,setSeconds] = useState(0)
    const [qrString,setQrString] = useState("")
    var Seconds=0;
    const getSeconds =()=>{
        var endDate = new Date();
        
        // Do your operations
        Seconds =Math.round( ((route.params.TicketDate -endDate.getTime()) / 1000)+15*60);
        console.log("Seconds"+Seconds)
       setSeconds(Seconds);
        console.log(seconds)
    }
    useEffect(() => {
      console.log(route.params.TicketDate)
      getSeconds();
       setQrString("this ticket is reserved at "+route.params.TicketDate+" in the parking "+route.params.parkingName+" and The slot is Number "+ route.params.slotIndex);
        lockOrientation()
    } )
    useEffect(() => {
        setSeconds(Seconds);
      } ,[seconds])
    const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      }
    return (
        <View>
        <CountDown
        size={30}
        until={seconds}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
        <QRCode
          value={qrString}
          size={300}
          bgColor='black'
          fgColor='white'/>
      </View>
    );
}