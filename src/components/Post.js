import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { db, auth } from '../../firebase/config';
import { FlatList } from 'react-native-web';
import {StyleSheet} from 'react-native';
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
	        .then(()=>{setLike(true)})
    }

    function sacarLike() {
        setLike(false);
        db.collection('posts')
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=>{setLike(false)})
    }

    useEffect(() => {
        if (props.data.likes && props.data.likes.includes(auth.currentUser.email)){
            setLike(true);
        }
    }, []);

    return(
        <View>
            <Text>{props.data.owner}</Text>
            <Text>{props.data.descripcionPost}</Text>
            {props.data.likes ? <Text>{props.data.likes.length} Likes</Text> : null}
            {like ? <Pressable onPress={sacarLike}>
                <Text>Sacar Like</Text></Pressable> : 
            <Pressable onPress={darLike}>
                <Text>Dar Like</Text></Pressable>}
            <Pressable onPress={() => props.navigation.navigate('Comentarios', {id: props.id})}>
                <Text>Comentarios</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    mostrar: {
        display: 'flex',
    },
    ocultar: {
        display: 'none',
    }
});

export default Post;