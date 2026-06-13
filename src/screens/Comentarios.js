import { Pressable, TextInput, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {db, auth} from '../firebase/config';
import { useEffect } from 'react';
import { FlatList } from 'react-native-web';

function Comentarios(props) {
    
const[post, setPost] = useState('');
const[comentarios, setComentarios] = useState('');
const idPost = props.route.params.id;

useEffect(() => {
    {post? db.collection('posts').doc(idPost).onSnapshot(doc => {setPost(doc.data())}) : <Text>Cargando...</Text>}
}, [])

function agregarComentario(){
    db.collection('posts').doc(idPost).update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
            autor: auth.currentUser.email,
            contenido: comentarios
        })
    })
    .then(() => setComentarios(''))
    .catch(error => console.log(error));
}

    return (
        <View>
            <Text>{post.data.owner}</Text>
            <Text>{post.data.descripcionPost}</Text>
            {post.data.comentarios ? <FlatList data={post.data.comentarios} keyExtractor={(item) => item.id} renderItem={({item}) => <View><Text>{item.autor}</Text><Text>{item.contenido}</Text></View>} /> : null}
            <TextInput
                placeholder="Escribe un comentario aquí..."
                data={comentarios}
                onChangeText={text => setComentarios(text)}
            />
            <Pressable onPress={() => {agregarComentario()}}>
                <Text>Enviar Comentario</Text>
            </Pressable>
        </View>


    )
}

export default Comentarios;