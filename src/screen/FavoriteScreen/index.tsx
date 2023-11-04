import { Button, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import React, {useEffect, useState, useCallback} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getPokemonFavoriteApi} from '../../api/FavoriteApi'
import useAuth from '../../hooks/useAuth';
import { TiposDatosPokemon } from '../../componentes/Pokemon';
import { getPokemonDetailsApi } from '../../api';
import { string } from 'yup';
import { PokemonList } from '../../componentes/PokemonList';
import NoLogged from '../../componentes/NoLogueado'

export default function FavoriteScreen() {

const [pokemons, setPokemons] = useState<Array<TiposDatosPokemon>>([]);
const {auth} = useAuth();

  /*Cuando usamos un useEffect buscamos que una acción se ejecute al renderizar nuestro código una o multiples veces según las dependencias que este hook está observando. El problema por el que no aparecen nuestros favoritos actualizados es que la Screen solo se renderiza una vez, luego cuando cambiamos de screen y volvemos a ella cambia es el “foco”, es decir, dejamos de enfocar esa screen o la volvemos a enfocar, pero el renderizado ya ocurrió. Esto permite mantener buen performance en la app… Pero nos trae problemas como este.
.
¿Entonces a qué viene el useFocusEffect?
Pues este hook de react navigation justamente nos ayuda a activar una sección de código tal como lo haría un useEffect durante el renderizado, pero cada vez que una pantalla sea enfocada en nuestra aplicación. De este modo solventamos el problema de no tener nuestro favoritos actualizados… Pero ahora hay otro problema.
.
useFocusEffect es un hook que recibe un callback para su ejecución, por esta razón un useEffect no nos serviría en este caso, ya que al tratar de asignarlo a una constante dentro del useFocusEffect se rompería (puedes probarlo poniendo un useEffect dentro del useFocusEffect).
.
¿Pero por qué usar useCallback en lugar de cualquier callback creado por nosotros?
Performance y practicidad 😃 no nos cuesta nada agregarlo, y el hook de useCallback nos permite decirle al código “hey, que te voy a usar muchas veces, entonces no me re-renderices todo si en el fondo la información no ha cambiado”. Y esto es muy útil en términos de performance, esto ocurre porque el hook de useCallback tiene un comportamiento de “memoización”, puedes leer más al respecto acá y acá.*/

    useFocusEffect(
    
useCallback(() => {
  if (auth) {
    (async()=>{
      const response = await getPokemonFavoriteApi();
      console.log(pokemons);

      const pokemonArray:TiposDatosPokemon[]= [];//creamos una constante que tendra los pokemones extraidos de la api
      for await (const id of response){ // un for await
       const pokemonDetails = await getPokemonDetailsApi(id);
        
        pokemonArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          imagen: pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }

      setPokemons(pokemonArray)
    })()
  }

}, [])
    )
  
  return (
   
      !auth ? <NoLogged/>: <PokemonList pokemons={pokemons} loadPokemon={function (): Promise<void> {
      throw new Error('Function not implemented.')
    } } isNext={null} isLoading={false}/>
      

  );
}