import { Pressable, TextInput, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { db, auth } from '../firebase/config';
import { useEffect } from 'react';
import { FlatList } from 'react-native-web';
import firebase from 'firebase';

function Comentarios(props) {

    const [post, setPost] = useState(null);
    const [comentarios, setComentarios] = useState('');
    const idPost = props.route.params.id;

    useEffect(() => 
        {db.collection('posts').doc(idPost).onSnapshot(doc => { setPost(doc.data()) })}
    ,[])

    function agregarComentario() {
        db.collection('posts').doc(idPost).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                autor: auth.currentUser.email,
                contenido: comentarios
            })
        })
            .then(() => setComentarios(''))
            .catch(error => console.log(error));
    }

    if (!post) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View>
            <Text>{post.owner}</Text>
            <Text>{post.descripcionPost}</Text>
            
            {post.comentarios ? 
            <FlatList 
                data={post.comentarios} 
                keyExtractor={(item) => item.autor + item.contenido} 
                renderItem={({ item }) => <View><Text>{item.autor}</Text><Text>{item.contenido}</Text></View>} /> : null}
            <TextInput
                placeholder="Escribe un comentario aquí..."
                value={comentarios}
                onChangeText={text => setComentarios(text)}
            />
            <Pressable onPress={() => { agregarComentario() }}>
                <Text>Enviar Comentario</Text>
            </Pressable>
        </View>


    )
}

export default Comentarios;