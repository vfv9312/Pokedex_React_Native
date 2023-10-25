
import { useState, useEffect } from "react";
import { getPokemonApi, getPokemonDetailsByUrlApi } from '../../api';
import { PokemonList } from "../PokemonList";
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export interface TiposDatosPokemon{
  id: string,
  name:string,
  type: string,
  order : number,
  imagen:string,
}

export default function PokedexContenido() {
  const [pokemons,setPokemons]= useState<TiposDatosPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
  useEffect (()=> {
    (async ()=>{
      await loadPokemon();
    })();
  },[]);

  const loadPokemon = async () =>{
    try {
      // inicializamos la "carga" del request
      setLoading(true);
      const response = await getPokemonApi(nextUrl);
      setNextUrl(response.next);
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
    }finally {
      // regresamos loading a false
          setLoading(false);
        }
  }
  return (
    <SafeAreaView>
      <PokemonList pokemons={pokemons} loadPokemon={loadPokemon} isNext={nextUrl} isLoading={loading}/>
    </SafeAreaView>
  )
}