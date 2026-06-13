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
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>📝 Creá tu Perfil</Text>
                <Text style={styles.subtitle}>Registrate Aca!</Text>
                <TextInput 
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email"
                    placeholderTextColor="#999"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <TextInput 
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Nombre de Usuario"
                    placeholderTextColor="#999"
                    onChangeText={text => setUsuario(text)}
                    value={usuario}
                />
                <TextInput 
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                {registerError ? <Text style={styles.error}>{registerError}</Text> : null}
                <Pressable style={styles.buttonPrimary} onPress={() => onSubmit()}>
                    <Text style={styles.buttonPrimaryText}>Registrarse</Text>
                </Pressable>
                <Pressable style={styles.linkSecondary} onPress={() => props.navigation.navigate("Login")}>
                    <Text style={styles.linkSecondaryText}>¿Ya tenés cuenta? Iniciá sesión</Text>
                </Pressable>
            </View>
        </View>
    )
}
export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f9fc',  
        justifyContent: 'center',       
        padding: 10,
    },
    formContainer: {
        backgroundColor: '#ffffff',
        marginHorizontal: 15,
        padding: 20,
        borderRadius: 4,        
        borderTopWidth: 4,
        borderTopColor: '#74acdf',      
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1e3d59',             
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 42,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#74acdf',  
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    error: {
        color: '#d9534f',
        textAlign: 'center',
        marginVertical: 8,
        fontWeight: 'bold',
    },
    buttonPrimary: {
        backgroundColor: '#74acdf',      
        padding: 12,
        borderRadius: 4,
        marginTop: 10,
    },
    buttonPrimaryText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    linkSecondary: {
        marginTop: 15,
        alignItems: 'center',
    },
    linkSecondaryText: {
        color: '#1e3d59',
        fontSize: 14,
        fontWeight: 'bold',
    }
});