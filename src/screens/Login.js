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
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>🏆 Bienvenido!</Text>
                <Text style={styles.subtitle}>Iniciár sesión</Text>

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
                    secureTextEntry={true}
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                {loginError ? <Text style={styles.error}>{loginError}</Text> : null}
                <Pressable style={styles.buttonPrimary} onPress={() => onSubmit()}>
                    <Text style={styles.buttonPrimaryText}>Ingresar</Text>
                </Pressable>
                <Pressable style={styles.linkSecondary} onPress={() => props.navigation.navigate("Register")}>
                    <Text style={styles.linkSecondaryText}>¿No tenés cuenta? Registrate acá</Text>
                </Pressable>
            </View>
        </View>
    );
}
export default Login;

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