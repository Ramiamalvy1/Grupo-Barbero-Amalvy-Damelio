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
    const [like, setLike] = useState(false);


    useEffect(() => {
        db.collection('posts')
            .doc(idPost)
            .onSnapshot(doc => {
                setPost(doc.data());

                if (
                    doc.data().likes &&
                    doc.data().likes.includes(auth.currentUser.email)
                ) {
                    setLike(true);
                } else {
                    setLike(false);
                }
            });
    }, []);


    function darLike() {
        setLike(true);
        db.collection('posts')
            .doc(idPost)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => { setLike(true) })
    }

    function sacarLike() {
        setLike(false);
        db.collection('posts')
            .doc(idPost)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => { setLike(false) })
    }


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
            {post.likes ? <Text style={styles.likesCount}>{post.likes.length} Likes</Text> : null}
            <View style={styles.actionsContainer}>
                {like ?
                    <Pressable style={styles.buttonDislike} onPress={sacarLike}>
                        <Text style={styles.buttonTextDislike}>Unlike</Text>
                    </Pressable>
                    :
                    <Pressable style={styles.buttonLike} onPress={darLike}>
                        <Text style={styles.buttonTextLike}>Like</Text>
                    </Pressable>}
            </View>

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

const styles = StyleSheet.create({
    postCard: {
        backgroundColor: '#ffffff',
        marginHorizontal: 15,
        marginVertical: 8,
        padding: 15,
        borderRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#74acdf',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    owner: {
        fontWeight: 'bold',
        color: '#1e3d59',
        fontSize: 14,
        marginBottom: 6,
    },
    descripcion: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 10,
    },
    likesCount: {
        fontSize: 13,
        color: '#74acdf',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    actionsContainer: {
        borderTopWidth: 1,
        borderTopColor: '#f4f9fc',
        paddingTop: 8,
    },
    buttonLike: {
        backgroundColor: '#74acdf',
        padding: 8,
        borderRadius: 4,
    },
    buttonTextLike: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonDislike: {
        backgroundColor: '#e6f0fa',
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#74acdf',
    },
    buttonTextDislike: {
        color: '#1e3d59',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonTextComment: {
        color: '#1e3d59',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});
export default Comentarios;