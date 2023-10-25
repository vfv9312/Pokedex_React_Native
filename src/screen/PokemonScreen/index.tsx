import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PokedexStackParamList } from '../../componentes/Navigation/PokedexNavigation';
import { getPokemonDetailsApi } from '../../api';
import { TiposDatosPokemon } from '../../componentes/Pokemon';

type PokemonProps = NativeStackScreenProps<PokedexStackParamList, 'Pokemon'>;

export default function PokemonScreen(props:PokemonProps) {
  const {route, navigation} = props;
  const {id} = route.params; // Accede a la propiedad 'params' directamente
  console.log(id);
  const [pokemon, setPokemon] = useState<TiposDatosPokemon | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [id]);

  if (!pokemon) return null;

  return (
    <View>
      <Text>Estamos en un POKEMON</Text>
      <Text>{pokemon.name}</Text>
    </View>
  );
}

