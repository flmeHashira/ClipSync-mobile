import React, { useState }from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  SafeAreaView,
  SafeAreaProvider
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient'

import {useApp} from '@realm/react';



const Btn = (props) => {
  return (
    <TouchableNativeFeedback
          onPress={props.handleClick}
          background={
            Platform.OS === 'android'
              ? TouchableNativeFeedback.SelectableBackground()
              : undefined
          }>
          <View style = {{  backgroundColor: '#FF4B2B',
                            padding: 10,
                            borderRadius: 20,
                            height: '15%',
                            width: '60%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20}} >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12}}>LOG IN</Text>
          </View>
        </TouchableNativeFeedback >
  )
}



const LogIn = () => {
  const [loginDetails, setloginDetails] = useState({
    email: '',
    password: ''
  })
  const [toggleLogin, setToggleLogin] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)

  const app = useApp();

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
      console.log(user)
      console.log(user.id)
    }
    catch (err) {
      setErrorMessage(prevState => prevState === false ? !prevState : prevState)
    }
  }

  return (
    // <LinearGradient
    //       colors={['#eff3ff', '#e6c9cc' ]}
    //       style={styles.linearGradient}
    //       start={{ x: 0, y: 0 }}
    //       end={{ x: 1, y: 1 }}>
      <View style={styles.loginDiv}>
        <Text style={styles.Header}>{toggleLogin ? 'Login' : 'Welcome!'}</Text>
        {errorMessage && <Text style={styles.errorMessage}>Incorrect username or password</Text>}
        <TextInput 
          style={styles.textInput}
          keyboardType="email-address" 
          placeholder="Email" 
          onChangeText = {text => handleChange(text, 'email')}
          value = {loginDetails.email}
           />
        <TextInput secureTextEntry={true}
            style={styles.textInput}
            placeholder="Password"
            onChangeText = {text => handleChange(text, 'password')}
            value = {loginDetails.password}
            />
        <Btn handleClick = {handleClick}/>
    </View>
    // </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
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
  }
});

export default LogIn;
