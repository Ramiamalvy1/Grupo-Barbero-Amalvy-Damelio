import React from "react";
import { View, Text } from "react-native";
import { Pressable } from "react-native";
import { TextInput } from "react-native-web"; 
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { auth } from "../firebase/config";

function Login(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    useEffect(function(){
        
        function verificarLogueo(usuarioLogueado){
            if (usuarioLogueado) {
                props.navigation.navigate("HomeMenu");
            }
        }
        auth.onAuthStateChanged(verificarLogueo);
    }, []);

    function onSubmit(){
        if (email == ""){
            setLoginError('El email no puede estar vacío');
            return;
        }
        else if (password == ""){
            setLoginError('La contraseña no puede estar vacía');
            return;
        }
        else {
            console.log("email: " + email);
            console.log("password: " + password);
            flogin(email, password);
        }
    }

    function flogin(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then(response => {
            props.navigation.navigate("HomeMenu");
        })
        .catch(error => { 
            setLoginError(error.message);
        });
    }

    return(
        <View>
            <Text>Pantalla de Login</Text>
            <Pressable onPress={() => props.navigation.navigate("Register")}>
                <Text>Ir a Registro</Text>
            </Pressable>
            <TextInput 
                style={styles.input}
                keyboardType="email-address"
                placeholder="email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput 
                style={styles.input}
                secureTextEntry={true}
                placeholder="password"
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <Text style={styles.error}>{loginError}</Text>
            <Pressable onPress={() => onSubmit()}>
                <Text>Ingresar</Text>
            </Pressable>
        </View>
    );
}
export default Login;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        margin: 10,
    }
});