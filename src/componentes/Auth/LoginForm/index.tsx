import { View, Text, StyleSheet, TextInput, Button, Keyboard} from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import {user, userDetails}from '../../../utils/userDB'
//el autoCapitalize='none' hace que al empezar a escribir inicie con minusculas
// secureTextEntry= {true} hace que se oculte las letras si es true
//instalamos npm install formik --save y npm install yup
export default function LoginForm() {
  const [error, setError] = useState('');
  const {login} = useAuth();
  
  



    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),//valida
      validateOnChange: false,
      onSubmit: (formValue) => {
       const {username, password} = formValue;
       if (username != user.userName && password != user.password) {
       
        setError('La contraseña o el usuario es inconrrecta');
       }
       else{
        login(userDetails);
        
       }
      },
    });

//creamos esta funcion anonima para llamar el dato de formik al presionar el boton
  const handleButtonPress = () => {
    formik.handleSubmit();
  };
  
    return (
      <View>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          placeholder="Nombre de usuario"
          style={styles.input}
          autoCapitalize="none"
          value={formik.values.username}
          onChangeText={(text) => formik.setFieldValue("username", text)}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={(text) => formik.setFieldValue("password", text)}
        />
        <View style={styles.buton}>
        <Button title="Entrar" onPress={handleButtonPress} />
        </View>
  {formik.errors.username? 
  <Text style={styles.error}>{formik.errors.username}</Text> : ""}
  
  {formik.errors.password? <Text style={styles.error}>{formik.errors.password}</Text> : ""}
  
  {error? <Text style={styles.error}>{error}</Text> : ""}
        
      </View>
    );
  }
  
  function initialValues() {
    return {
      username: "",
      password: "",
    };
  }
  
  function validationSchema() {
    return {
      username: Yup.string().required("El usuario es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),//debe tener informacion
    };
  }
  
  const styles = StyleSheet.create({
    title: {
      textAlign: "center",
      fontSize: 28,
      fontWeight: "bold",
      marginTop: 50,
      marginBottom: 15,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
    },
    error: {
      textAlign: "center",
      color: "#f00",
      marginTop: 20,
    },
    buton:{

      width:200,
      justifyContent: "center",
      padding:30,
      marginHorizontal:100,
    }

  });