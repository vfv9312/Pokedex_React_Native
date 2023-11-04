import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoriteScreen from "../../../screen/FavoriteScreen";
import PokemonScreen from "../../../screen/PokemonScreen";

// tipando los parametros de cada pantalla principal para pasar un id
type PokedexStackParamList = {
  Pokedex: undefined;
  Pokemon: {
    id: string;
  };
  Favorite :{}
};

const Stack = createStackNavigator<PokedexStackParamList>();



export default function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{headerTitle: "Favoritos", headerTitleAlign:"center"}}
      />
      
      <Stack.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={{title: "", headerTransparent: true}}
      />
      
    </Stack.Navigator>
  )
}