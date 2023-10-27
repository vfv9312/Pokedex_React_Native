import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../../screen/AccountScreen";

const Stack = createStackNavigator();// stack es un boton para navegar entre pantallas

// options={{headerTitle: "Mi Cuenta", headerTitleAlign:"center"}} muestra una barra con un titulo arriba

export default function AccountNavigation() {
  return (
    <Stack.Navigator
    
    >
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{headerTitle: "Mi Cuenta", headerTitleAlign:"center"}}
      />
      
    </Stack.Navigator>
  )
}