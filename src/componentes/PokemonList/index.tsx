import { StyleSheet, Text, FlatList, ActivityIndicator , Platform } from 'react-native'
import type { TiposDatosPokemon } from '../Pokemon';
import { PokemonCard } from "../PokemonCard";
import React from 'react'

interface PokemonListProps {
    pokemons: TiposDatosPokemon[];
    loadPokemon: () => Promise<void>;
    isNext:null | string;
  }

export function PokemonList(props:PokemonListProps) {
    const {pokemons, loadPokemon, isNext} = props;
    
    console.log(Platform.OS);
    

    const loadMore = () => {
      loadPokemon();
      
    }


    
  return (
    <FlatList
    data={pokemons}
    numColumns={2}
    showsVerticalScrollIndicator={false}
    keyExtractor={(pokemons => String(pokemons.id))}
    renderItem={(item)=> <PokemonCard pokemon={item.item}/>}
    contentContainerStyle={styles.flatListContainer}
    onEndReached={() => {
      if(isNext) loadMore();
      }}
    onEndReachedThreshold={0.1}
    ListFooterComponent={
      isNext ? (      <ActivityIndicator
        size={'large'}
        style={styles.spinner} color={"#AEAEAE"}/>
  ):null}/>

    
  )
}
const styles = StyleSheet.create({
    flatListContainer: {
        paddingHorizontal: 20,
        marginTop: Platform.OS === 'android' ? 5: 0,
    },
    spinner:{
      marginTop: 20,
      margin:60,
    }
})