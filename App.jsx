import React, { useState } from 'react'
import LogIn from './LogIn'
import Home from './Home'
import realmContext from './RealmAPIs'
import {UserProvider, AppProvider} from '@realm/react';

const {RealmProvider} = realmContext;

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableNativeFeedback,
    SafeAreaView,
  SafeAreaProvider
  } from 'react-native';


const App = () => {
    return (
    <AppProvider id={'clip-sync-ehley'}>
        <UserProvider fallback={LogIn}>
            <RealmProvider
                // fallback={<Loading/>} 
                sync={{
                    flexible: true,
                    onError: console.error}}>
                <Home />
            </RealmProvider>
        </UserProvider>
    </AppProvider>  
    )
}

export default App