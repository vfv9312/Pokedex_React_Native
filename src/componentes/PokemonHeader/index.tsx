import { StyleSheet, View, SafeAreaView, Text, Image } from 'react-native'
import React from 'react'
import { TiposDatosPokemon } from '../Pokemon';
import { capitalize } from "lodash";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

export default function PokemonHeader(props: TiposDatosPokemon) { //tipamos los props por los datos que si usaremos
  
    
    const { name, order, imagen, type } = props; //destructuramos

    const color = getColorByPokemonType(type); // llamamos la funcion para pintar el color del tipo

    const bgStyle = [{ backgroundColor: color, ...styles.bg }];//bgStyle es un array con un bckgrouncolor con el color mediante el typo que nos servira de fondo y concatenamos los valores de style.bg
    
    /* capitalize hace mayusculas la primera letra del texto */
    
    /* el padStart es una funcon en js que rellena espacios en este caso colocamos 3 espacion con un string 0 para que aparesca
001 y order es el numero de pokemon por lo que le decimos que si hay espacios tipamos con 0 */

  return (
    <>
      <View style={bgStyle} />

      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{capitalize(name)}</Text>
          <Text style={styles.order}>#{`${order}`.padStart(3, '0')}</Text> 
        </View>
        <View style={styles.contentImg}>
          <Image source={{ uri: imagen }} style={styles.image} />
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    bg: {
      width: "100%",
      height: 400,
      position: "absolute",
      borderBottomEndRadius: 300,
      borderBottomLeftRadius: 300,
      transform: [{ scaleX: 2 }],
    },
    content: {
      marginHorizontal: 20,
      marginTop: 30,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 40,
    },
    name: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 27,
    },
    order: {
      color: "#fff",
      fontWeight: "bold",
    },
    contentImg: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      top: 30,
    },
    image: {
      width: 250,
      height: 300,
      resizeMode: "contain",//resizeMode es necesario para que agarre bien los estilos en android

    },
  });