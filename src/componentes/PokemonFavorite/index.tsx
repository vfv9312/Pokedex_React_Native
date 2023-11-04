import React, {useEffect, useState} from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome5'// los iconos que sacamos con FontAwesome5 estan sin relleno y FontAwesome es con relleno
import { StyleSheet } from 'react-native';
import { addPokemonFavoriteApi, isPokemonFavorite, removePokemonFavoriteApi} from '../../api/FavoriteApi';

export default function PokemonFavorite(props:{id:string}) {
    const {id} = props;

    const [isFavorites, setisFavorites] = useState<boolean | undefined>(undefined);
    const [reloadCheck, setReloadCheck] = useState<boolean>(false)



   
    useEffect(() => {
      (async()=>{
        try {
          const response = await isPokemonFavorite(id);
          setisFavorites(response);
          
        } catch (error) {
          setisFavorites(false);
        }
      })();
  
    }, [id, reloadCheck])//se va actualizar la lista de pokemones cada que id el pokemon y el reloadCheck cambien su estatus

    const onReloadCheckFavorite = ()=>{
      setReloadCheck((prev) => !prev); // prev va a negarse cada que entre para ir cambiando de true a false
    }
    

    

    const addFavorite = async() => {
        
      try {await addPokemonFavoriteApi(id);//agregamos un pokemon a favoritos
        onReloadCheckFavorite();// llamaos la funcion para que cambie de estatus y no se pueda agregar mas
        
      } catch (error) {
        console.log(error);
        
      }}

        const removeFavorite = async () => {
          try {
            await removePokemonFavoriteApi(id);//funcion remover
            onReloadCheckFavorite();// actualizar el estatus del icono
          } catch (error) {
            console.log(error);
            
          }
          
        }

  return (

    <Icon name="heart" color="#fff" size={20} onPress={isFavorites ? removeFavorite : addFavorite} style={styles.icono} solid={isFavorites}/>

  )
}

const styles = StyleSheet.create({
icono:{
    marginRight:20
}
})
