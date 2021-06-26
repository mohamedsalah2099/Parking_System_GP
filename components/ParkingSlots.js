import React ,{useEffect,useState}from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import * as ScreenOrientation from 'expo-screen-orientation';
const ShowContentModal=(status)=>{
    
    const onPressSlot=()=>{
        console.log(status.allSlots.length)
        if(status.status==0){
            console.log(status.emptySlotIndex)
             for(let i=0;i<status.allSlots.length;i++){
                 if(i== status.emptySlotIndex  ){
                     status.allSlots[i].status=2;
                 }
             }
             status.setUpdatedSlots(status.allSlots)
      
        }
    }
    return(
        <View>
        <Text style={{fontSize:18,color:"#0d1b2a",fontWeight:"bold"}}>{status.message}</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{status.setEnable(false); onPressSlot()}}>
    <Text style={{fontSize:16,fontWeight:"bold"}}>Ok</Text>
  </TouchableOpacity>
  {
      status.status==0?
        <TouchableOpacity style={styles.button} onPress={()=>{status.setEnable(false); }}>
    <Text style={{fontSize:16,fontWeight:"bold"}}>Cancel</Text>
  </TouchableOpacity>:
  <Text></Text>
}
  </View>
    );
}
const SlotAction=(status)=>{
    
 return(
  <Modal 
  isVisible={status.status}
  animationInTiming={2000}
  animationOutTiming={2000}
  backdropColor="transparent"
>
  <View style={styles.modalContent}>
  {
      status.slotStatus==1?
     <ShowContentModal message="Sorry,the slot is busy" status={status.slotStatus} setEnable={status.setStatus}/>
      :
      status.slotStatus==2?
    <ShowContentModal message="Sorry,the slot is reserved" status={status.slotStatus} setEnable={status.setStatus}/>
      :
      <ShowContentModal message={"The slot will cost"+status.parking.cost+" /hour , Are you sure to continue?" }status={status.slotStatus} setEnable={status.setStatus}
      emptySlotIndex={status.slotIndex} allSlots={status.AllSlots} setUpdatedSlots={status.setslots}/>
      
  }

</View>
</Modal>
 );
}
export default function ParkingSlots() {
    const Parking = {title:"Tahrir Parking",cost:7,availableSlot:5,totalSlots:10,slots:[{status:1,sensor:102},{status:0,sensor:103},{status:2,sensor:104},
        {status:0,sensor:105},{status:1,sensor:106},{status:2,sensor:107},{status:0,sensor:108},{status:1,sensor:109},{status:0,sensor:110},{status:0,sensor:111}]}
        const [slots,setSlots]= useState(Parking.slots);
        const [enable,setEnable]= useState(false);
        const [slotStatus,setSlotStatus] = useState(0);
        const [Index,setIndex] = useState(0)
        useEffect(() => {
        lockOrientation()
        
      }, [])
    
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      }
      
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.background} colors={['#0f4c5c', 'transparent']} />
      <Text style={[styles.headerStyle,{top:20, left:10,}]}>Tahrir Parking</Text>
   <Text style={[styles.headerStyle,{top:20, left:300,}]}>Available slots: 5</Text>
   <View style={{justifyContent:"center",margin:"auto",flexWrap:"wrap",flexDirection:"row",width:"100%",height:"100%",marginTop:80
}}>
  {
       slots.map((slot,index)=>(
        
               <TouchableOpacity key={index}style={{backgroundColor:"#fff",width:70,height:100,marginHorizontal:20 ,marginBottom:20}}
               onPress={()=>{setEnable(true);setSlotStatus(slot.status);setIndex(index)}}>
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
   <SlotAction status={enable} setStatus={setEnable} slotStatus={slotStatus}  parking={Parking} slotIndex={Index} AllSlots={slots} setslots={setSlots}/>
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
    marginHorizontal:60,
    shadowOpacity: 0.25,
    shadowColor:"#fff"
   
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