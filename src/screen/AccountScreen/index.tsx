import {SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import LoginForm from '../../componentes/Auth/LoginForm';
import UserData from '../../componentes/Auth/UserData';
import useAuth from '../../hooks/useAuth';

export default function AccountScreen() {

  const {auth} = useAuth(); // al inicio en null
  //si llega a tener datos entra el UserData 
  return (
    <View>
      {auth ? <UserData/> : <LoginForm/>}
      
    </View>
  )
}