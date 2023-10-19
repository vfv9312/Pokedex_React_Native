import { View, Text } from 'react-native'
import React from 'react'
import { API_HOST } from "../utils/constans";

export async function getPokemonApi(endPointUrl:string|null) {
try {
    const url= `${API_HOST}/pokemon?limit=20&offset=0`;
    const response = await fetch(endPointUrl || url);
    const result = await response.json();
    return result;
} catch (error) {
    throw new Error("malito");
}
}


export async function getPokemonDetailsByUrlApi(url:string) {
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }