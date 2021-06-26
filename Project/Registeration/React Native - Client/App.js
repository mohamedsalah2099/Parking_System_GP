import React, {useEffect} from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';

export default class App extends React.Component {

   async _onPressButton() {
      try{
        let data = {
            name:'Mo_Salah',
            email:'mosalah@gmail.com',
            password:'1234'
      };
        await fetch('http://localhost:3000',{
      method:'post',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(data)
    }).then(res => res.json())
  .then(json => console.log(json));
  }
  catch(e){
    console.log(e);
  }
  }

  async _onPressGet() {
      try{
        let data = {
            email:'mosalah@gmail.com',
            password:'1234'
      };
       await fetch('http://localhost:3000/login',{
      method:'post',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(data)
    })
    .then(result => (result.json()))
    .then(out => (JSON.parse(out)))
    .then(final => {
      console.log(final.Info.NumberOfReadings)
      if(final.Info.NumberOfReadings)
        console.log("User is found");
      else
      console.log("User not found");
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
          <Button
            onPress={this._onPressGet}
            title="Get Data"
          />
    </View>
  )
  }
}
