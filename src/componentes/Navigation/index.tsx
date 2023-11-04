import React from "react";
import{createBottomTabNavigator}from "@react-navigation/bottom-tabs";
import {Image} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 
import FavoriteNavigation from "./FavoriteNavigation";
import PokedexNavigation from "./PokedexNavigation";
import AccountNavigation from "./Account";
const Tab=createBottomTabNavigator();



export default function Navigation(){
//screenOptions={{ headerShown:false }} quita la barra de titulo de la parte de arriba para que no se duplique con el de stack tambien se puede hacer al reves
  return(<Tab.Navigator
  initialRouteName="Pokedex"
    screenOptions={{ headerShown:false ,
      tabBarActiveTintColor: '#e91e63'}}
  
  >
    <Tab.Screen name="Favorite"component={FavoriteNavigation} options={{tabBarLabel: "Favorito",  tabBarIcon:({color, size})=> <Icon name="heart" color={color } size={size}/>}}/>
    <Tab.Screen name="Pokedex"component={PokedexNavigation} options={{tabBarLabel: "WikiPokemon", tabBarIcon:()=>renderPokeball()}} />
    <Tab.Screen name="Account"component={AccountNavigation} options={{tabBarLabel: "Cuenta", tabBarIcon:({color, size})=> (<Icon name="user-secret" color={color} size={size}/>)}}/>
    </Tab.Navigator>);
    }

 

    function renderPokeball(){return(<Image
      source={require("../../../assets/icon.png")}
      style={{width:75,height:75,top:-20}}/>);}