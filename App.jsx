import React, { useState } from 'react'
import Auth from './components/Auth'
import Home from './components/Home'
import realmContext from './RealmAPIs'
import {UserProvider, AppProvider} from '@realm/react';
import Loading from './components/Loading'

const {RealmProvider} = realmContext;

import { Appearance } from 'react-native';


const App = () => {
    Appearance.setColorScheme('light')
    return (
    <AppProvider id={'clip-sync-ehley'}>
        <UserProvider fallback={Auth}>
            <RealmProvider  fallback={<Loading/>} 
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