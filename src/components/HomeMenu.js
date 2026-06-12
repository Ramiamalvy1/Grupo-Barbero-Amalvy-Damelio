import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Home from "../screens/Home";
import Perfil from "../screens/Perfil";
import AntDesign from '@expo/vector-icons/AntDesign';
import StackNavegator from "./StackNavegator";
import Posts from "../screens/Posts";

const Tab = createBottomTabNavigator();

function HomeMenu(props){
    return(        
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Stack" component={StackNavegator} options={{tabBarIcon: ()=> <FontAwesome name="home" size={20} color='black'/>}}/>
                <Tab.Screen name="AddPost" component={Posts} options={{tabBarIcon: ()=> <FontAwesome name="plus" size={20} color='black' />}}/>
                <Tab.Screen name="Perfil" component={Perfil} options={{tabBarIcon: ()=> <AntDesign name="user" size={20} color="black" />}}/>
            </Tab.Navigator>
    )
}

export default HomeMenu;