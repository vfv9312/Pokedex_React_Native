import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PokemonScreen from "../../../screen/PokemonScreen";
import PokedexScreen from "../../../screen/PokedexScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// tipando los parametros de cada pantalla principal
export type PokedexStackParamList = {
  Pokedex: undefined;
  Pokemon: {
    id: string;
  };
};

const Stack =  createNativeStackNavigator<PokedexStackParamList>();

export default function PokedexNavigation() {
  return (
    <Stack.Navigator
    screenOptions={{ headerShown:false }}
    >
        
      <Stack.Screen  name="Pokedex" component={PokedexScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
}