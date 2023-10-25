import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../../screen/AccountScreen";

const Stack = createStackNavigator();

export default function AccountNavigation() {
  return (
    <Stack.Navigator
    screenOptions={{ headerShown:false }}
    >
      <Stack.Screen
        name="Account"
        component={AccountScreen}
      />
      
    </Stack.Navigator>
  )
}