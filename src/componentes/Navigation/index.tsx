import React from "react";
import{createBottomTabNavigator}from "@react-navigation/bottom-tabs";
import {Image} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 
import Pokedex from "../../screen/Pokedex";
import Account from "../../screen/Account";
import Favorite from "../../screen/Favorite";
const Tab=createBottomTabNavigator();

export default function Navigation(){

  return(<Tab.Navigator>
    <Tab.Screen name="Favorite"component={Favorite} options={{tabBarLabel: "Favorito", headerTitle: "Favoritos", headerTitleAlign:"center", tabBarIcon:({color, size})=> <Icon name="heart" color={color} size={size}/>}}/>
    <Tab.Screen name="Pokedex"component={Pokedex} options={{tabBarLabel: "WikiPokemon", headerTitle: "Enciclopedia Pokemon", headerTitleAlign:"center", tabBarIcon:()=>renderPokeball()}}/>
    <Tab.Screen name="Account"component={Account} options={{tabBarLabel: "Cuenta", headerTitle: "Mi Cuenta", headerTitleAlign:"center", tabBarIcon:({color, size})=> (<Icon name="user-secret" color={color} size={size}/>)}}/>
    </Tab.Navigator>);
    }

 

    function renderPokeball(){return(<Image
      source={require("../../assets/icono_pokedex.png")}
      style={{width:75,height:75,top:-20}}/>);}