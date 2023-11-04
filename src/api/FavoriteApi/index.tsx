
import AsyncStorage from '@react-native-async-storage/async-storage'; //instalamos : npm i @react-native-async-storage/async-storage
import { includes, pull  } from 'lodash';
import {FAVORITE_STORAGE} from '../../utils/constans'
import React from 'react'
import { string } from 'yup';

export async function getPokemonFavoriteApi() { //obtenemos los id de los pokemones que seleccionesmos como favoritos
    try {
        const response = await AsyncStorage.getItem(FAVORITE_STORAGE) // conseguimos el string donde estan guardados los id 
        return JSON.parse(response || '[]');
        
    } catch (error) {
        throw error;
    }
}

export async function addPokemonFavoriteApi(id:string) {
try {
    const favorites:string[] = await getPokemonFavoriteApi();
    favorites.push(id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites))
    
    
} catch (error) {
    throw error;
}
}

export async function isPokemonFavorite(id:string){
    try {
        const response = await getPokemonFavoriteApi();
        return includes(response, id);// includes indica que si en response ya tiene el id devolvera true y si no false
    } catch (error) {
        
    }
}

export async function removePokemonFavoriteApi(id:string){
try {
    const favorites = await getPokemonFavoriteApi();
    const newFavorites = pull(favorites, id);// el pull encuentra el id en un array de 1 nivel
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
} catch (error) {
    throw error
}
}
