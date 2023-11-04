import { View, Text } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

export default () => useContext(AuthContext);
