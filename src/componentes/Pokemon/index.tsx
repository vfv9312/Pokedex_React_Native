
import { useState, useEffect } from "react";
import { getPokemonApi, getPokemonDetailsByUrlApi } from '../../api';
import { PokemonList } from "../PokemonList";
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export interface TiposDatosPokemon{//tipamos los datos que recibiremos en la api
  id: string,
  name:string,
  type: string,
  order : number,
  imagen:string,
}

export default function PokedexContenido() {
  const [pokemons,setPokemons]= useState<TiposDatosPokemon[]>([]); //creamos un array que tendra los datos que tipamos
  const [nextUrl, setNextUrl] = useState<string | null>(null); // nos guardara en string
  const [loading, setLoading] = useState<boolean>(false); // servira para validar

  
  useEffect (()=> {
    (async ()=>{
      await loadPokemon();// si es positivo entra el loadPokemon
    })();
  },[]);//no se vuelve a renderizar

  const loadPokemon = async () =>{//una funcion anonima  async
    try {//si esta bien entra
      // inicializamos la "carga" del request
      setLoading(true);//validamos el estado loading en true
      const response = await getPokemonApi(nextUrl);// llamamos la funcion para optener api y enviamos. nextUrl que puede tener una url o un null
      setNextUrl(response.next);//actualizamos si responde el api
      const pokemonArray:TiposDatosPokemon[]= [];//creamos una constante que tendra los pokemones extraidos de la api
      for await (const pokemon of response.results){ // un for await
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