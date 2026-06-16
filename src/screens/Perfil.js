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
    container: {
        flex: 1,
        backgroundColor: '#f4f9fc',   
        padding: 10,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#74acdf',
        fontWeight: 'bold',
    },
    postCard: {
        backgroundColor: '#ffffff',
        marginHorizontal: 12,
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
        padding: 10,
        borderRadius: 4,
    },
    buttonTextLike: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonDislike: {
        backgroundColor: '#e6f0fa',     
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#74acdf',
    },
    buttonTextDislike: {
        color: '#1e3d59',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e3d59',
        marginHorizontal: 12,
        marginTop: 15,
        marginBottom: 8,
    },
    commentBox: {
        backgroundColor: '#ffffff',
        marginHorizontal: 12,
        marginVertical: 4,
        padding: 12,
        borderRadius: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    commentAuthor: {
        fontWeight: 'bold',
        color: '#1e3d59',
        fontSize: 13,
    },
    commentContent: {
        fontSize: 14,
        color: '#444',
        marginTop: 2,
    },
    noComments: {
        textAlign: 'center',
        margin: 20,
        color: '#999',
        fontSize: 14,
    },
    footer: {
        marginTop: 'auto',                
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        marginBottom: 10,
    },
    input: {
        height: 42,
        marginHorizontal: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#74acdf',           
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    buttonPrimary: {
        backgroundColor: '#74acdf',       
        marginHorizontal: 12,
        padding: 12,
        borderRadius: 4,
    },
    buttonPrimaryText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});
