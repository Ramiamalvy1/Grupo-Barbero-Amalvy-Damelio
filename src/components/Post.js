import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { db, auth } from '../firebase/config';
import { FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import firebase from 'firebase';



function Post(props) {

    const [like, setLike] = useState(false);

    function darLike() {
        setLike(true);
        db.collection('posts')
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => { setLike(true) })
    }

    function sacarLike() {
        setLike(false);
        db.collection('posts')
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => { setLike(false) })
    }

    useEffect(() => {
        if (props.data.likes && props.data.likes.includes(auth.currentUser.email)) {
            setLike(true);
        } else {
            setLike(false);
        }
    }, [props.data.likes]);

    return (
        <View style={styles.postCard}>
            <Text style={styles.owner}>⚽ {props.data.owner}</Text>
            <Text style={styles.descripcion}>{props.data.descripcionPost}</Text>
            {props.data.likes ? <Text style={styles.likesCount}>{props.data.likes.length} Likes</Text> : null}
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
            <View>
                <Pressable onPress={() => props.navigation.navigate('Menu', {screen: 'Comentarios', params: {id: props.id}})}>
                    <Text style={styles.buttonTextComment}>Comentarios</Text>
                </Pressable>
            </View>
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
    },
});

export default Post;