import LogIn from "../components/LogIn"
import SignUp from '../components/SignUp'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const Auth = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator
            initialRouteName="LogIn"
            screenOptions={{
                headerShown: false,
              }}>
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />

        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Auth