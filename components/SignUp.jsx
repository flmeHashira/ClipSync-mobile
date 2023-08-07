import React, { useState }from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';



import {useApp} from '@realm/react';
import Btn from '../components/Btn'

const SignUp = ({navigation}) => {
  const [loginDetails, setloginDetails] = useState({
    email: '',
    password: ''
  })

  const app = useApp()

  const handleChange = (text, input) => {
    setloginDetails(prevLoginDetails => ({...prevLoginDetails, [input]: text}));
  }

  const handleClick = async () => {
    const email =  loginDetails.email
    const password = loginDetails.password
    await app.emailPasswordAuth.registerUser({email, password})
    navigation.navigate('LogIn')
  }

  return (
    <View style={styles.background}>
      <View style={styles.loginDiv}>
        <Text style={styles.Header}>Welcome!</Text>
            
            <TextInput 
                style={styles.textInput}
                keyboardType="email-address" 
                placeholder="Email" 
                onChangeText = {text => handleChange(text, 'email')}
                value = {loginDetails.email}/>

            <TextInput secureTextEntry={true}
                style={styles.textInput}
                placeholder="Password"
                onChangeText = {text => handleChange(text, 'password')}
                value = {loginDetails.password}/>
                
        <Btn handleClick = {handleClick} text={'SIGN UP'}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  //Container styling
  background: {
    height: '100%',
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  Header: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    fontSize: 40,
    marginBottom: 40,
  },
  loginDiv: {
    marginTop: '20%',
    width: 'auto',
    height: 'auto',
    padding: 20,
    borderRadius: 35,
    // backgroundColor: '#f7f8fa',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInput:  {
    backgroundColor: '#eee',
    padding: 12,
    margin: 8,
    width: '90%'
  },
});

export default SignUp