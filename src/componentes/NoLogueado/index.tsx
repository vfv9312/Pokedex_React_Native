import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";



export default function NoLogged() {
  const navigation = useNavigation();
/*
  const navigateToForm = ()=>{
    navigation.navigate('Account');
  }*/


  return (
    <View style={styles.content}>
      <Text style={styles.text}>
        Para ver esta pantalla tienes que inicar sesión
      </Text>
      <Text>Usuario : vfv9312</Text>
        <Text>Contraseña 12345</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 50,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
});