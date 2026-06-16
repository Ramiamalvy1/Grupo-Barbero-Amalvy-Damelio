import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebase/config';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { FlatList } from 'react-native';
import Post from '../components/Post';

function Perfil(props) {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('users')
            .where('email', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    setUser(doc.data());
                });

            });

        db.collection('posts')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                let misPosts = [];
                docs.forEach(doc => {
                    misPosts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setPosts(misPosts);
            });

    }, []);

    if (user === null) {
        return <Text>Cargando...</Text>;
    }


    return (
        <View>
            <Text>{user.usuario}</Text>
            <Text>{auth.currentUser.email}</Text>
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={props.navigation}/>}
            />
            <Pressable onPress={() => {
                auth.signOut()
                    .then(() => { props.navigation.navigate('Login') })
            }}>
                <Text>Desloguearse</Text>
            </Pressable>
        </View>
    );
}

export default Perfil;

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