import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';
import Swiper from 'react-native-swiper';


const ShowContentModal = (status) => {
  const navigation = useNavigation()
  const [bookedDate, setBookedDate] = useState(0);
  const onPressSlot = () => {
    console.log(status.allSlots.length)
    if (status.status == 0) {
      console.log(status.emptySlotIndex)
      for (let i = 0; i < status.allSlots.length; i++) {
        if (i == status.emptySlotIndex) {
          status.allSlots[i].status = 2;
        }
      }
      status.setUpdatedSlots(status.allSlots)
      status.setEnableInfo(true)
      status.setEnable(true)
      var CurrentDate = new Date(); //Current Hours

      setBookedDate(CurrentDate);
    }

  }
  const navigateToTicket = () => {
    status.setEnable(false);
    status.setEnableInfo(false);
    var endDate = new Date();
    // Do your operations
    var Seconds = Math.round(((bookedDate - endDate.getTime()) / 1000) + 15);
    console.log(navigation);
    navigation.navigate({
      name: "YourTicket",
      params: { TicketDate: bookedDate, countDown: Seconds, slotIndex: status.emptySlotIndex, parkingName: status.parkingTitle ,Slots:status.allSlots,setSlots:status.setUpdatedSlots},

    }); LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
  }
  return (
    <View>
      <Text style={{ fontSize: 18, color: "#0d1b2a", fontWeight: "bold" }}>{status.message}</Text>
      {status.enableInfo == true ?
        <View >
          <TouchableOpacity style={styles.button} onPress={() => {
            navigateToTicket()
          }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Show your ticket</Text>
          </TouchableOpacity>
        </View>
        :
        <TouchableOpacity style={styles.button} onPress={() => { status.setEnable(false); onPressSlot(); }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Ok</Text>
        </TouchableOpacity>
      }
      {
        status.status == 0 || status.enableInfo == false ?
          <TouchableOpacity style={[styles.button]} onPress={() => { status.setEnable(false); status.setEnableInfo(false); }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Cancel</Text>
          </TouchableOpacity> :
          <Text></Text>
      }

    </View>
  );
}



const SlotAction = (status) => {

  return (

    <Modal
      isVisible={status.status}
      animationInTiming={2000}
      animationOutTiming={2000}
      backdropColor="transparent"
    >
      <View style={styles.modalContent}>
        {
          status.slotStatus == 1 ?
            <ShowContentModal message="Sorry,the slot is busy" status={status.slotStatus} setEnable={status.setStatus} allSlots={status.AllSlots} />
            :
            status.slotStatus == 2 && status.enableInfo == false ?
              <ShowContentModal message="Sorry,the slot is reserved" status={status.slotStatus} setEnable={status.setStatus} allSlots={status.AllSlots}
              />
              :
              status.slotStatus == 0 && status.enableInfo == true ?
                <ShowContentModal message={"Congratulations!! you reserved slot number " + status.slotIndex + " the ticket will expire after 1 hour."} status={status.slotStatus} setEnable={status.setStatus}
                setUpdatedSlots={status.setslots} emptySlotIndex={status.slotIndex} allSlots={status.AllSlots} setEnableInfo={status.setEnableInfo} enableInfo={status.enableInfo} />
                :
                <ShowContentModal message={"The slot will cost " + status.parking.cost + " /hour  Are you sure to continue?"} status={status.slotStatus} setEnable={status.setStatus}
                  emptySlotIndex={status.slotIndex} allSlots={status.AllSlots} setUpdatedSlots={status.setslots} setEnableInfo={status.setEnableInfo} enableInfo={status.enableInfo}
                  parkingTitle={status.parking.title} />

        }

      </View>
    </Modal>

  );
}



function ParkingSlots({ navigation }) {
  const Parking = {
    title: "Tahrir Parking", cost: 7, availableSlot: 5, totalSlots: 10, slots: [{ status: 0, sensor: 218 }, { status: 0, sensor: 219 },
    { status: 0, sensor: 220 }, { status: 0, sensor: 221 }, { status: 0, sensor: 222 }, { status: 0, sensor: 223 }, { status: 1, sensor: 224 }, { status: 0, sensor: 225 },
    { status: 0, sensor: 226 }, { status: 0, sensor: 227 }, { status: 0, sensor: 228 }, { status: 0, sensor: 229 }, { status: 0, sensor: 230 }, { status: 0, sensor: 231 }, { status: 0, sensor: 232 }, { status: 0, sensor: 233 }]
  }
  const [slots, setSlots] = useState(Parking.slots);
  const [enable, setEnable] = useState(false);
  const [slotStatus, setSlotStatus] = useState(0);
  const [Index, setIndex] = useState(0)
  const [enableInfo, setEnableInfo] = useState(false);
  const [showSlots, setShowSlots] = useState(false)


  async function getSlotsData(slot, index) {

    try {

      await fetch('https://arrogant-sorry-14928.herokuapp.com/getSensor', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sensorID: slot.sensor
        })
      })
        .then(res => res.json())
        .then(json => {
          console.log(JSON.stringify(json))
          if (Math.round(JSON.stringify(json)) == 5 && slot.status != 2 ) {
            slot.status = 0
          } else  if (Math.round(JSON.stringify(json)) == 0) {
            slot.status = 1
          } if (index == 15) {
            setShowSlots(true)
       
          }
        }
        );
    } catch (e) {
      console.log(e);
    }


  }


  useEffect(() => {
    lockOrientation()
    Parking.slots.map((slot, index) =>
      getSlotsData(slot, index))
    console.log("yes")
    //setSlots(Parking.slots)
  })

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
  }

  return (

    <View style={styles.container}>
      <LinearGradient style={styles.background} colors={['#0f4c5c', 'transparent']} />
      <Text style={[styles.headerStyle, { top: 20, left: 10, }]}>Tahrir Parking</Text>
      <Text style={[styles.headerStyle, { top: 20, left: 300, }]}>Available slots: 5</Text>
      <TouchableOpacity style={styles.refreshBTn} onPress={() => {
        setShowSlots(false); slots.map((slot, index) =>
          getSlotsData(slot, index))
        console.log("yes");
      }}><Text style={{ color: "white" }}>Refresh</Text></TouchableOpacity>



      <View style={{ justifyContent: "center", margin: "auto", width: "100%", height: "100%", marginTop: 80 }}>
        <Swiper dot={<View style={styles.dot} />} activeDot={<View style={styles.activeDot} />}
          paginationStyle={{ bottom: 70 }} loop={false}>
          <View style={{ justifyContent: "center", flexWrap: "wrap", flexDirection: "row" }}>
            {
              showSlots ?
                slots.filter((slot, Index) =>
                  Index < 8).map((slot, index) => (

                    <TouchableOpacity key={index} style={{ backgroundColor: "#fff", width: 70, height: 100, marginHorizontal: 30, marginBottom: 20 }}
                      onPress={() => { setEnable(true); setSlotStatus(slot.status); setIndex(index); }}>
                      <ImageBackground style={{ width: "100%", height: "100%" }} source={require('../assets/emptySlot.jpg')}>
                        {
                          slot.status == 1 ?
                            <Image style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={require('../assets/car.png')} />
                            :
                            slot.status == 2 ?
                              <Image style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={require('../assets/reserved.png')} />
                              :
                              <Text></Text>
                        }
                      </ImageBackground>
                    </TouchableOpacity>


                  )) :
                <View />
            }
          </View>
          <View style={{ justifyContent: "center", flexWrap: "wrap", flexDirection: "row" }}>
            {
              showSlots ?
                slots.filter((slot, Index) =>
                  Index >= 8).map((slot, index) => (

                    <TouchableOpacity key={index} style={{ backgroundColor: "#fff", width: 70, height: 100, marginHorizontal: 30, marginBottom: 20 }}
                      onPress={() => { setEnable(true); setSlotStatus(slot.status); setIndex(index); }}>
                      <ImageBackground style={{ width: "100%", height: "100%" }} source={require('../assets/emptySlot.jpg')}>
                        {
                          slot.status == 1 ?
                            <Image style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={require('../assets/car.png')} />
                            :
                            slot.status == 2 ?
                              <Image style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={require('../assets/reserved.png')} />
                              :
                              <Text></Text>
                        }
                      </ImageBackground>
                    </TouchableOpacity>

                  )) : <View />
            }
          </View>
        </Swiper>

      </View>

      <SlotAction status={enable} setStatus={setEnable} enableInfo={enableInfo} setEnableInfo={setEnableInfo} slotStatus={slotStatus} parking={Parking} slotIndex={Index} AllSlots={slots} setslots={setSlots} />


    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1b2a',
    width: "100%",
    height: "100%",

  }, background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 250,
  }, headerStyle: {
    position: 'absolute',

    fontSize: 30,
    color: "#fff",
    fontWeight: "bold"
  }, modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 60,
    shadowOpacity: 0.25,
    shadowColor: "#fff"

  }, button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',

  }, dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginBottom: 10,
    marginLeft: 7,
    marginRight: 7
  }, activeDot: {
    backgroundColor: '#fff',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginBottom: 10,
    marginLeft: 7,
    marginRight: 7
  }, refreshBTn:
  {
    backgroundColor: "#0d1b2a",
    position: "absolute", top: 25,
    right: 10, width: "10%", height: "10%",
    alignItems: "center", justifyContent: "center",
    borderRadius: 20
  }

});
export { ParkingSlots, ShowContentModal }