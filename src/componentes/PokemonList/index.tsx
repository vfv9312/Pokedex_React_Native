import { StyleSheet, Text, FlatList } from 'react-native'
import type { TiposDatosPokemon } from '../Pokemon';
import { PokemonCard } from "../PokemonCard";
import React from 'react'

interface PokemonListProps {
    pokemons: TiposDatosPokemon[];
  }

export function PokemonList(props:PokemonListProps) {
    const {pokemons} = props;

    const loadMore = () => {
      console.log("cargando mas pokemon");
      
    }


    
  return (
    <FlatList
    data={pokemons}
    numColumns={2}
    showsVerticalScrollIndicator={false}
    keyExtractor={(pokemons => String(pokemons.id))}
    renderItem={(item)=> <PokemonCard pokemon={item.item}/>}
    contentContainerStyle={styles.flatListContainer}
    onEndReached={loadMore}
    onEndReachedThreshold={0.1}/>
    
  )
}
const styles = StyleSheet.create({
    flatListContainer: {
        paddingHorizontal: 20,
    }
})