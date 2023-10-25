import { SafeAreaView, Text } from 'react-native'
import React from 'react'
import PokedexContenido from '../../componentes/Pokemon'

export default function PokedexScreen() {
  return (
    <SafeAreaView>
      <PokedexContenido/>
    </SafeAreaView>
  )
}