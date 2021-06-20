import * as React from 'react';
import { Pressable, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to our Home Screen</Text>
       <Pressable
        onPress={() => navigation.openDrawer()}
        style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
      >
      <Text>Open Drawer</Text>
      </Pressable>
    </View>
  );
}

function Map({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 20}}>Map Details</Text>
      <Pressable
        onPress={() => navigation.navigate('Wallet')}
        style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
      >
      <Text>Go to Wallet</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.openDrawer()}
        style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
      >
      <Text>Open Drawer</Text>
      </Pressable>
    </View>
  );
}

function Wallet({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 20}}>My Wallet</Text>
       <Pressable
        onPress={() => navigation.navigate('Map')}
        style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
      >
      <Text>Go to Map</Text>
      </Pressable>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function App() {
  return (
     <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home}  />
        <Drawer.Screen name="Map" component={Map} />
        <Drawer.Screen name="Wallet" component={Wallet} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
