import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PokemonScreen from "../../../screen/PokemonScreen";
import PokedexScreen from "../../../screen/PokedexScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// tipando los parametros de cada pantalla principal para pasar un id
export type PokedexStackParamList = {
  Pokedex: undefined;
  Pokemon: {
    id: string;
  };
};

const Stack =  createNativeStackNavigator<PokedexStackParamList>();

//options={{title :"", headerTransparent:true}}/> hace que no se vea la barra de titulo al navegar al componente PokemonScreen

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
        
      <Stack.Screen  name="Pokedex" component={PokedexScreen} options={{headerTitle: "Enciclopedia Pokemon", headerTitleAlign:"center"}}/>
      <Stack.Screen name="Pokemon" component={PokemonScreen} options={{title :"", headerTransparent:true}}/>
    </Stack.Navigator>
  );
}