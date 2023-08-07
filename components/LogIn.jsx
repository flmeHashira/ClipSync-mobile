import React, { useState }from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable

} from 'react-native';

import {useApp} from '@realm/react';
import Btn from '../components/Btn'

const LogIn = ({navigation}) => {
  const [loginDetails, setloginDetails] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState(false)

  const app = useApp()

  const handleChange = (text, input) => {
    setloginDetails(prevLoginDetails => ({...prevLoginDetails, [input]: text}));
  }

  const handleClick = async () => {
    const credentials = Realm.Credentials.emailPassword(
      loginDetails.email,
      loginDetails.password
    )
    try{
      const user = await app.logIn(credentials)
      // console.log(user)
      // console.log(user.id)
    }
    catch (err) {
      setErrorMessage(prevState => prevState === false ? !prevState : prevState)
    }
  }

  return (
    <View style={styles.background}>
      <View style={styles.loginDiv}>
        <Text style={styles.Header}>Login</Text>

            {errorMessage && <Text style={styles.errorMessage}>Incorrect username or password</Text>}
            
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

        <Btn handleClick = {handleClick} text={'LOG IN'}/>

          <View style={styles.span}>
            <Text style={{color: '#c0c1c3'}}>Don't have an acoount?</Text>
            <Pressable style={{marginLeft: 8}}
                       onPress={() => navigation.navigate('SignUp')}>
              <Text style={{ color: '#ff5a20'}}>Sign Up</Text>
            </Pressable>

          </View>
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
    fontSize: 50,
    marginBottom: 50,
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
  errorMessage: {
    borderWidth: 2,
    borderColor: '#fcc2c3',
    backgroundColor: '#fce4e4',
    color: '#a20028',
    paddingHorizontal: 3,
    fontFamily: 'Roboto',
    marginBottom: 10
  },

  textInput:  {
    backgroundColor: '#eee',
    padding: 12,
    margin: 8,
    width: '90%'
  },

  //span styling
  span: {
    marginTop: 100,
    flexDirection: 'row'
  }
});

export default LogIn;
