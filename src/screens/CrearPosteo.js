import { Pressable, TextInput, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {db, auth} from '../firebase/config';
import { useEffect } from 'react';

function CrearPosteo() {
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
        .then()
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