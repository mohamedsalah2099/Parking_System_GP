import React ,{useState, useEffect}from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import SignIn from './components/signIn.js';
import SignUp from './components/signUp.js';
import ParkingMap from './components/parkingMap.js';
import { ParkingSlots } from './components/ParkingSlots';
import YourTicket from './components/YourTicket';
import { NavigationContainer ,DrawerActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,
    DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
const Stack = createStackNavigator();
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
function Root({route}) {
 
return (
  
    
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} drawerContentOptions={{
    activeTintColor: '#0f4c5c',
    itemStyle: { marginVertical: 5 },
  }}>
  <Drawer.Screen name="ParkingMap" component={ParkingMap}  />
  <Drawer.Screen name="ParkingSlots" component={ParkingSlots} initialParams={{name:route.params.name,email:route.params.email }}/>
  <Drawer.Screen name="YourTicket" component={YourTicket}  initialParams={{ email:route.params.email }}  />
  
</Drawer.Navigator>

);
}




  export default function App({navigation}) {
   
  return (
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName='SignIn' headerMode="false">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="Root" component={Root}  />
       
    </Stack.Navigator>
    
      </NavigationContainer>
  );
}



