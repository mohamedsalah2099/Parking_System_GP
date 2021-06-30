import React ,{useState, useEffect}from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import ParkingMap  from './parkingMap';
import { ParkingSlots } from './ParkingSlots';
import YourTicket from './YourTicket';
import { createDrawerNavigator,DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, } from '@react-navigation/drawer';
    import { useNavigation } from '@react-navigation/native';

 
const Drawer = createDrawerNavigator();

//const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
    const navigation = useNavigation();
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sign out"
          onPress={() =>navigation.navigate("SignIn")}
        />
      </DrawerContentScrollView>
    );
  }
  export default function App() {
 
  return (
    
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} >
    <Drawer.Screen name="ParkingMap" component={ParkingMap}/>
    <Drawer.Screen name="ParkingSlots" component={ParkingSlots}/>
    <Drawer.Screen name="YourTickets" component={YourTicket}/>
    
  </Drawer.Navigator>
  );
}



