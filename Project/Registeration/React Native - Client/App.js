import React, {useEffect} from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';

export default class App extends React.Component {
   async _onPressButton() {  
      try{
        let data = {
            name:'Mohamed Finaaaal',
            email:'mohamedfinalll@gmail.com',
            password:'finalpass'
      };
        await fetch('http://localhost:3000',{
      method:'post',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(data)
    })
  } 
  catch(e){
    console.log(e);
  }
  }
render(){
  return (
    <View>
          <Button
            onPress={this._onPressButton}
            title="Insert Data"
          />
    </View>
  )
  }
}
