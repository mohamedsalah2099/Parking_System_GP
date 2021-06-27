import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
function validateEmail(val) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  }
  
const SignUp = ({navigation}) => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [nameError,setNameERR]=useState("");
    const [emailError,setEmailERR]=useState("");
    const [passError,setPassERR]=useState("")
    const _onPressButton=async()=> {  
        if(email=="")
        setEmailERR("*Email field can't be empty");
        else if(!validateEmail(email)){
            setEmailERR("*Your email isn't valid");
        }
        else { setEmailERR("")}
        if(name=="")
        setNameERR("*Username field can't be empty");
        else if(name.length<3){
            setNameERR("*Your name must be more than 2 characters");
        }
        else { setNameERR("")}
        if(password=="")
        setPassERR("*Password field can't be empty");
        else if(password.length<=3){
            setPassERR("*Your password must be more than 3 characters");
        }
        else { setPassERR("")}
       if(emailError==""&&nameError==""&&passError==""){
       
        try{
            let data = {
                name:name,
                email:email,
                password:password
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
      }  }
   }
 
    return (
        <View style={styles.container}>
        <LinearGradient style={styles.background} colors={['#0f4c5c', 'transparent']} />
        <View style={styles.container2} >
            <Text style={styles.TextStyle}>Sign up</Text>
            <View >
                <Text style={styles.inputHeader}  >UserName</Text>
                <TextInput style={styles.input} placeholder="yourName" placeholderTextColor="#adb5bd" autoCapitalize="none"
                onChangeText={(username) => setName(username)}
                value={name}/>
                <Text style={{color:"#fff",fontSize:16}}>{nameError}</Text>
                <Text style={styles.inputHeader}  >E-mail</Text>
                <TextInput style={styles.input} placeholder="yourName@example.com" placeholderTextColor="#adb5bd" autoCapitalize="none"
                    keyboardType="email-address"  onChangeText={(email) => setEmail(email)}
                    value={email} />
                     <Text style={{color:"#fff",fontSize:16}}>{emailError}</Text>
                <Text style={styles.inputHeader} >Password</Text>
                <TextInput style={styles.input} placeholder="your password" placeholderTextColor="#adb5bd" secureTextEntry={true} 
                 onChangeText={(pass) => setPassword(pass)}
                 value={password} />
                 <Text style={{color:"#fff",fontSize:16}}>{passError}</Text>
                <TouchableOpacity style={styles.buttonStyle} onPress={_onPressButton}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.touchStyle}>You already have an account?| </Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("SignIn")}}>
                        <Text style={styles.touchStyle}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
</View>
        </View>
    );
}

const styles = StyleSheet.create({
    TextStyle: {
        color: '#fff',
        fontSize: 35,
        fontFamily: "serif",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 40
    },
    input: {
        height: 40,
        marginBottom: 15,
        borderBottomWidth: 1,
        fontSize: 20,
        color: "#fff",
        borderColor: "#adb5bd",
    },
    inputHeader: {
        color: '#fff',
        fontSize: 20,
        fontFamily: "serif",
        fontWeight: "bold",
    },
    container2: {
        width: "80%",
    }, container: {
        flex: 1,
        backgroundColor:'#0d1b2a',
        alignItems: 'center',
        justifyContent: 'center',
      },  background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 250,
      },
    buttonStyle: {
        backgroundColor: "#0f4c5c",
        alignItems: "center",
        marginHorizontal: 80,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 15,

    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    },
    touchStyle: {
        color: "#adb5bd",
        marginVertical: 10,
        fontSize: 16,

    }
});
export default SignUp;