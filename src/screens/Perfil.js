import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebase/config';

function Perfil(props) {
    return (
        <View>
            <Text>Profile</Text>
            <Pressable onPress={() => {
                props.navigation.navigate('Login');
                auth.signOut();
            }}>
                {console.log('Desloguearse')}
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
    profileCard: {
        backgroundColor: '#ffffff',
        marginHorizontal: 15,
        marginTop: 20,
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
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    buttonLogout: {
        backgroundColor: '#d9534f',
        padding: 12,
        borderRadius: 4,
    },
    buttonTextLogout: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});