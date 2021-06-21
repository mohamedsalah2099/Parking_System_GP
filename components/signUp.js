import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
const SignUp = () => {
    return (
        <View style={styles.container} >


            <Text style={styles.TextStyle}>Sign up</Text>
            <View >
                <Text style={styles.inputHeader}  >UserName</Text>
                <TextInput style={styles.input} placeholder="yourName" placeholderTextColor="#adb5bd" autoCapitalize="none"/>
                <Text style={styles.inputHeader}  >E-mail</Text>
                <TextInput style={styles.input} placeholder="yourName@example.com" placeholderTextColor="#adb5bd" autoCapitalize="none"
                    keyboardType="email-address" />
                <Text style={styles.inputHeader} >Password</Text>
                <TextInput style={styles.input} placeholder="your password" placeholderTextColor="#adb5bd" secureTextEntry={true} />
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.touchStyle}>You already have an account?| </Text>
                    <TouchableOpacity >
                        <Text style={styles.touchStyle}>Sign in</Text>
                    </TouchableOpacity>
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
    container: {
        width: "80%",
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