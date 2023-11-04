import { StyleSheet, View, Text, Button } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import {size } from 'lodash'
import React, { useCallback, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { getPokemonFavoriteApi } from '../../../api/FavoriteApi';

export default function UserData() {
const {auth, logout} = useAuth();
const [total, setTotal] = useState<number>(0);

useFocusEffect(
  useCallback(()=>{
    (async()=>{
      try {
        const response = await getPokemonFavoriteApi();
        setTotal(size(response));
      } catch (error) {
        setTotal(0);
      }
    })()
  },[])
)

  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text>
        {`${auth?.firstName} ${auth?.lastName}`}
      </Text>
      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth?.firstName} ${auth?.lastName}`}/>
        <ItemMenu title="Username" text={auth?.userName}/>
        <ItemMenu title="Correo Electronico" text={auth?.email}/>
        <ItemMenu title="Pokemones Favoritos" text={`${total} Pokemones`}/>
      </View>
      </View>

      <View style={styles.buton}>
        <Button color={"red"} title='Desconectarse' onPress={logout}></Button>
      </View>
    </View>
  )
}

function ItemMenu(props:any){
  const {title, text} = props;
  return(
    <View style={styles.ItemMenu}>
      <Text style={styles.itemMenuTitle}>{title}:</Text>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content:{
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock:{
    marginBottom: 30,
  },
  title:{
    fontWeight: "bold",
    fontSize: 22
  },
  dataContent:{
    marginBottom:20,
  },
  ItemMenu:{
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 10,
    borderColor: "#CFCFCF"
  },
  itemMenuTitle:{
    fontWeight: "bold",
    padding: 10,
    width:120
  },
  buton:{
    width:"auto",
    flexDirection:"row",
    justifyContent:"center",
    
  }
})