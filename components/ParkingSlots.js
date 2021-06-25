import React ,{useEffect,useState}from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import * as ScreenOrientation from 'expo-screen-orientation';
 
export default function ParkingSlots() {
    const Parking = {title:"Tahrir Parking",cost:7,availableSlot:5,totalSlots:10,slots:[{status:1,sensor:102},{status:0,sensor:103},{status:2,sensor:104},
        {status:0,sensor:105},{status:1,sensor:106},{status:2,sensor:107},{status:0,sensor:108},{status:1,sensor:109},{status:0,sensor:110},{status:0,sensor:111}]}
    const [enable,setEnable]= useState(false);
    const [slotStatus,setSlotStatus] = useState(0);
        useEffect(() => {
        lockOrientation()
      }, [])
    
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      }
      const ShowModal=(status)=>{
          console.log(status)
       return(
        <Modal 
        isVisible={status.status}
        animationInTiming={2000}
        animationOutTiming={2000}
        backdropTransitionInTiming={2000}
        backdropTransitionOutTiming={2000}
      >
        <View style={styles.modalContent}>
        {
            status.slotStatus==1?
            <Text style={{fontSize:18,color:"#0d1b2a",fontWeight:"bold"}}>Sorry, the slot is busy</Text>
            :
            status.slotStatus==2?
            <Text style={{fontSize:18,color:"#0d1b2a",fontWeight:"bold"}}>Sorry, the slot is Reserved</Text>
            :
           <View>
            <Text style={{fontSize:18,color:"#0d1b2a",fontWeight:"bold"}}>The slot will cost {Parking.cost} /hour , Are you sure to continue?</Text>
            <TouchableOpacity style={[styles.button]} onPress={()=>{status.setStatus(false); }}>
        <Text style={{fontSize:16,fontWeight:"bold"}}>Cancel</Text>
      </TouchableOpacity>
      </View>
        }
        <TouchableOpacity style={styles.button} onPress={()=>{status.setStatus(false); }}>
        <Text style={{fontSize:16,fontWeight:"bold"}}>Ok</Text>
      </TouchableOpacity>
    </View>
      </Modal>
       );
      }
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.background} colors={['#0f4c5c', 'transparent']} />
      <Text style={[styles.headerStyle,{top:20, left:10,}]}>Tahrir Parking</Text>
   <Text style={[styles.headerStyle,{top:20, left:300,}]}>Available slots: 5</Text>
   <View style={{justifyContent:"center",margin:"auto",flexWrap:"wrap",flexDirection:"row",width:"100%",height:"100%",marginTop:80
}}>
  {
       Parking.slots.map((slot,index)=>(
        
               <TouchableOpacity key={index}style={{backgroundColor:"#fff",width:70,height:100,marginHorizontal:20 ,marginBottom:20}}
               onPress={()=>{setEnable(true);setSlotStatus(slot.status)}}>
                  <ImageBackground style={{width:"100%",height:"100%"}}  source={require('../assets/emptySlot.jpg')}>
                      {
                         slot.status==1? 
                         <Image style={{width:"100%",height:"100%",resizeMode:"contain"}}  source={require('../assets/car.png')}/>
                         :
                        slot.status==2?
                        <Image style={{width:"100%",height:"100%",resizeMode:"contain"}}  source={require('../assets/reserved.png')}/>
                        :
                        <Text></Text>
                      }
                  </ImageBackground>
               </TouchableOpacity>
               
       ))
   }
   
   </View>
   <ShowModal status={enable} setStatus={setEnable} slotStatus={slotStatus}/>
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
  },headerStyle:{
    position: 'absolute',
   
   fontSize:30,
   color:"#fff",
   fontWeight:"bold"
  },  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal:60
   
  },button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    
  }
});