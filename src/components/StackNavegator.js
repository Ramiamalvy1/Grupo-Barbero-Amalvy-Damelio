import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Comentarios from '../screens/Comentarios';

const Stack = createNativeStackNavigator()

function StackNavegator(){
    return(
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Comentarios" component={Comentarios} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default StackNavegator;