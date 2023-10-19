
import { useState, useEffect } from "react";
import { getPokemonApi, getPokemonDetailsByUrlApi } from '../../api';
import { PokemonList } from "../PokemonList";
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export interface TiposDatosPokemon{
  id: number,
  name:string,
  type: string,
  order : number,
  imagen:string,
}

export default function Pokemon() {
  const [pokemons,setPokemons]= useState<TiposDatosPokemon[]>([])
  
  useEffect (()=> {
    (async ()=>{
      await loadPokemon();
    })();
  },[]);

  const loadPokemon = async () =>{
    try {
      const response = await getPokemonApi();
      const pokemonArray:TiposDatosPokemon[]= [];
      for await (const pokemon of response.results){
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
        
        pokemonArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          imagen: pokemonDetails.sprites.other["official-artwork"].front_default,
        })
      }

      setPokemons([...pokemons, ...pokemonArray]);
      
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <SafeAreaView>
      <PokemonList pokemons={pokemons}/>
    </SafeAreaView>
  )
}