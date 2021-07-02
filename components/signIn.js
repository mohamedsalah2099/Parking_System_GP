import React ,{useState}from 'react';
import { StyleSheet, Text, View, TextInput ,TouchableOpacity,ImageBackground} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Modal from 'react-native-modal';
function validateEmail(val) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  }
const SignIn = ({navigation}) => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [emailError,setEmailERR]=useState("");
    const [passError,setPassERR]=useState("")
    const [enableModal,setEnableModal] = useState(false)
    const _onPressButton=async()=> {
        if(email=="")
        setEmailERR("*Email field can't be empty");
        else if(!validateEmail(email)){
            setEmailERR("*Your email isn't valid");
        }
        else { setEmailERR("")}
        
        if(password=="")
        setPassERR("*Password field can't be empty");
        else if(password.length<=3){
            setPassERR("*Your password must be more than 3 characters");
        }
        else { setPassERR("")}
       if(emailError==""&& passError==""){
           
        try{
            let data = {
                email:email,
                password:password
          };
          await fetch('https://arrogant-sorry-14928.herokuapp.com/login',{
            method:'post',
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(data)
          }).then(res => res.json())
        .then(json => {console.log(json)
            if(json=="Not Found"){
     setEnableModal(true)
            }else{
                navigation.navigate("Root");
            }
        });
        }
        catch(e){
          console.log(e);
          
        }
   }
    }
    return (
            <View style={styles.container}>
    <ImageBackground style={{justifyContent:"center",alignItems:"center", width:"100%",height:"100%"}}  source={require('../assets/background.jpg')}>
        <View style={styles.container2} >
      
            <Text style={styles.TextStyle}>Sign in</Text>
            <View >
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
                <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={styles.touchStyle}>Don't have an account?| </Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("SignUp")}} >
                    <Text style={styles.touchStyle}>Sign up</Text>
                </TouchableOpacity>
                </View>
            </View>
            
        </View>
        <Modal
    isVisible={enableModal}
    animationInTiming={2000}
    animationOutTiming={2000}
    backdropTransitionInTiming={2000}
    backdropTransitionOutTiming={2000}
  >
    <View style={styles.modalContent}>
    
    <Text style={{fontSize:20,color:"#0d1b2a",fontWeight:"bold",textAlign:"center"}}>The email or password is incorrect.please try again.</Text>
    <View style={{flexDirection:"row"}}>
<TouchableOpacity style={styles.button} onPress={()=>setEnableModal(false)}>
  <Text style={{fontSize:16,fontWeight:"bold"}}>OK</Text>
</TouchableOpacity>
</View>
</View>
  </Modal>
        </ImageBackground>
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
        marginBottom:40
    },
    input: {
        height: 40,
        marginBottom: 15,
        borderBottomWidth: 1,
        fontSize:20,
        color:"#fff",
        borderColor: "#adb5bd",
    },
    inputHeader:{
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
    buttonStyle:{
        backgroundColor:"#0f4c5c",
        alignItems:"center",
        marginHorizontal:80,
        paddingVertical:10,
        borderRadius:10,
        marginVertical:15,
       
    },
    buttonText:{
        fontSize:20,
        color:"#fff"
    },
    touchStyle:{
        color:"#adb5bd",
        marginVertical:10,
        fontSize:16,
       
    }
    ,button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      }
});
export default SignIn;