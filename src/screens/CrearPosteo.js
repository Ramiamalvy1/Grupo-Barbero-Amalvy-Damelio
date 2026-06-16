import { Pressable, TextInput, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {db, auth} from '../firebase/config';
import { useEffect } from 'react';

function CrearPosteo(props) {
    const [post, setPost] = useState('');

    function enviarPosteo(){
        console.log('Post enviado:', post);
        db.collection('posts').add({
            owner: auth.currentUser.email,
            descripcionPost: post,
            comentarios: [],
            likes: [],
            createdAt: Date.now()
        })
        .then(() => props.navigation.navigate("Menu", {screen:"Home"}, setPost('')))
        .catch(error => console.log(error));
    }

    return (
        <View>
            <Text>Crear Posteo</Text>
            <TextInput
                placeholder="Escribe tu posteo aquí..."
                value={post}
                onChangeText={text => setPost(text)}
            />
            <Pressable onPress={enviarPosteo}>
                <Text>Enviar Posteo</Text>
            </Pressable>
        </View>
    );
}



export default CrearPosteo;

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
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e3d59',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        marginBottom: 15,
    },
    input: {
        height: 70,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#74acdf',
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
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
    }
});