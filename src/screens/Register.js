import React from "react";
import { View, Text } from "react-native";
import { Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

function Register(props){
    const[email, setEmail] = useState("");
    const[usuario, setUsuario] = useState("");
    const[password, setPassword] = useState("");
    const[register, setRegister] = useState(false);
    const[registerError, setRegisterError] = useState("");

    function onSubmit(){
        if (email ==""){
            setRegisterError('El email no puede estar vacío');
            return;
        }
        else if (usuario ==""){
            setRegisterError('El usuario no puede estar vacío');
            return;
        }
        else if (password ==""){
            setRegisterError('La contraseña no puede estar vacía');
            return;
        }
        else{
        console.log("email: " + email);
        console.log("usuario: " + usuario);
        console.log("password: " + password);
        fregister(email, password, usuario);
        }
    }
    function fregister(email, pass, usuario){
        auth.createUserWithEmailAndPassword(email, pass)
        .then( response => {db.collection("users").add({
            email: email,
            usuario: usuario,
            createdAt: Date.now()
        }) 
        .then(()=>{setRegister(true); props.navigation.navigate("Login")})
        .catch( error => { console.log(error)})
    })
        .catch( error => { setRegisterError(error.message)}) 

    }
        
    return(
        <View>
            <Text>Pantalla de Registro</Text>
            <Pressable onPress={() => props.navigation.navigate("Login")}>
                <Text>Ir a Login</Text>
            </Pressable>
            <TextInput style={styles.input}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={text => setEmail(text)}
            value={email}/>
            <TextInput style={styles.input}
            keyboardType="default"
            placeholder="usuario"
            onChangeText={text => setUsuario(text)}
            value={usuario}/>
            <TextInput style={styles.input}
            secureTextEntry={true}
            placeholder="password"
            onChangeText={text => setPassword(text)}
            value={password}/>
            <Text style={styles.error}>{registerError}</Text>
            <Pressable onPress={() => onSubmit()}>
                <Text>Registrarse</Text>
            </Pressable>
        </View>
    )
}
export default Register;

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
})