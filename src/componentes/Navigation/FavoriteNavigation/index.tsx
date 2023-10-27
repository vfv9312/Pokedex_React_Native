import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoriteScreen from "../../../screen/FavoriteScreen";

const Stack = createStackNavigator();

export default function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{headerTitle: "Favoritos", headerTitleAlign:"center"}}
      />
      
    </Stack.Navigator>
  )
}