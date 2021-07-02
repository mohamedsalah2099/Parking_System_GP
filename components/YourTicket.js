import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import CountDown from 'react-native-countdown-component';
import QRCode from 'react-native-qrcode-generator';
import { LinearGradient } from 'expo-linear-gradient';

async function  _onPressPostSensor (sensor,value) {
  try {
    const sens=218
    await fetch ('https://arrogant-sorry-14928.herokuapp.com/postSensor', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sensorStatus:value,
        sensorID : sensor
      })
    })
      .then (res => res.json ())
      .then (json => console.log (JSON.stringify (json)));
  } catch (e) {
    console.log (e);
  }
}

function Countdown(status) {
  console.log(status.userReservedtime)
  
return(
  
  <CountDown
  
  size={30}
  until={status.userReservedtime}
  onFinish={()=>{
    if(status.actionAfterFinish){
     
    for (let i = 0; i < status.Slots.length; i++) {

      if (i == status.emptySlotIndex && status.Slots[i].status==2) {
        console.log("finish")
        status.Slots[i].status = 0
        status.setSlots(status.Slots)
        _onPressPostSensor(status.Slots[i].sensor,"5")
      }
    }
  }}}
  digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
  digitTxtStyle={{color: '#1CC625'}}
  timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
  separatorStyle={{color: '#1CC625'}}
  timeToShow={['H', 'M', 'S']}
  timeLabels={{m: null, s: null}}
  showSeparator
/>
  
)
  
}
export default function YourTicket({ route }) {
    const [date,setDate] = useState(0)
    const [seconds,setSeconds] = useState(0)
    const [slotInd,setSlotInd] = useState(0)
    const [parkingN,setParkN] = useState("")
    const [qrString,setQrString] = useState("")
    const [reserveFromUser,setReserveFromUser] = useState(false)
    var Seconds;
    useEffect(()=>{
       route.params?console.log("yes"):console.log("no")
       if(route.params){
         setReserveFromUser(true)
        setDate(route.params.TicketDate);
        setSlotInd(route.params.slotIndex)
        setSeconds(route.params.countDown)
        setParkN(route.params.parkingName)
        setQrString(date+parkingN+slotInd);
       }else{
        setReserveFromUser(false)
        setDate(0);
        setSlotInd(2)
         setSeconds(0)
        setParkN("gddd")
        setQrString(date+parkingN+slotInd);
       }
    })
 
    return (
      <View style={styles.container}>
      <LinearGradient style={styles.background} colors={['#0f4c5c', 'transparent']} />
       {   seconds?
        <View>
             <View style={{marginVertical:50}}>
        
             <Countdown userReservedtime={route.params?route.params.countDown:seconds} Slots={route.params.Slots} emptySlotIndex={route.params.slotIndex} 
             setSlots={route.params.setSlots} actionAfterFinish={reserveFromUser}/>
             </View>
             <View style={{justifyContent:"center",alignItems:"center"}}>
               <QRCode
                 value={qrString}
                 size={300}
                 bgColor='black'
                 fgColor='white'/>
                 </View> 
                 </View>
                 :
                 <View style={{justifyContent:"center",alignItems:"center"}}>
                 <Text style={{marginTop:280,fontSize:20,color:'white',fontWeight:"bold"}}>There is no reserved slots</Text>
                 </View>
       }
  
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