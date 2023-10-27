import React, {useState, useEffect} from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PokedexStackParamList } from '../../componentes/Navigation/PokedexNavigation';
import { getPokemonDetailsApi } from '../../api';
import { TiposDatosPokemon } from '../../componentes/Pokemon';
import PokemonHeader from '../../componentes/PokemonHeader';
import { ScrollView } from 'react-native';
import PokemonType from '../../componentes/PokemonType';
import PokemonStats from '../../componentes/PokemonStats';
import  Icon  from 'react-native-vector-icons/FontAwesome';

type PokemonProps = NativeStackScreenProps<PokedexStackParamList, 'Pokemon'>;//creamos un type para tipar los props
type TiposDatosPokemonModificado = Omit<TiposDatosPokemon, "type"| "imagen"> & {types:[{type:{name:string}}]} & {stats:{}} & {sprites:{other:{"official-artwork":{front_default:string}}}} ;
//omitimos algunos valores del TiposDatosPokemon y agregamos otros con los datos de manejaremos
export default function PokemonScreen(props:PokemonProps) {
  const {route, navigation} = props;//destructuramos props para sacar route navigatigation 
  const {id} = route.params; // Accede a la propiedad 'params' directamente
  //console.log(id);
  const [pokemon, setPokemon] = useState<TiposDatosPokemonModificado | null>(null);//tipamos con los datos que extraemos
useEffect(() => {
navigation.setOptions({
  headerRight:()=>null,
  headerLeft:()=> <Icon name='arrow-left' color="#fff" size={20} style={{marginLeft :20}}
  onPress={()=>console.log("atras")
  }/>,
})
}, [navigation, id])



  useEffect(() => {//useEffect para realizar la llamada de api
    (async () => {
      try {//si es bueno la conexion entra el try 
        const response = await getPokemonDetailsApi(id);// llamamos la funcion de get Pokemon y pasamos el argumento id 
        setPokemon(response);// actualizamos nuestro estado con lo que responsa la llamada del api
      } catch (error) {
        navigation.goBack(); //si marca error va hacia atras
      }
    })();
  }, [id]);//el id quiere dar entender que se realizara el llamado de api cada que el id cambie

  if (!pokemon) return null;

  return (
    <ScrollView>
      <PokemonHeader //Componente Header le mandaremos los datos de la Api 
id={pokemon.id}
name={pokemon.name}
order={pokemon.order}
imagen={pokemon.sprites.other["official-artwork"].front_default}
type={pokemon.types[0].type.name}/>
<PokemonType //pasamos por props de types que tenga en el array
types={pokemon.types}
/>
<PokemonStats  //pasamos las habilidades que tienen los pokemones que se guardan en stats
stats={pokemon.stats}
/>

    </ScrollView>
  );
}

