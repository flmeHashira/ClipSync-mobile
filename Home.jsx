import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  SafeAreaView,
  SafeAreaProvider,
  ScrollView,
  FlatList
} from 'react-native';

import Card from './Card'

import realmContext, {clipContent} from './RealmAPIs'
const {useRealm, useQuery, useObject} = realmContext
import { useUser } from '@realm/react'


const Home = () => {

    const user = useUser();
    console.log('here')

    const realm = useRealm();
    const allSubscriptions = realm.subscriptions;
    const query = useQuery(clipContent).filtered("owner_id == $0", user.id)
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
          // Create subscription for filtered results.
          mutableSubs.add(query);
        });
      }, []);
    console.log(allSubscriptions)
    // console.log(query)

    return (
        // <View style={{flex:1, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center',
        // flexDirection: 'row'}}>
        <FlatList
        numColumns={2}
        columnWrapperStyle={{flex:1, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center',
                flexDirection: 'row'}}

            data={query}
            renderItem={({ item }) => (
                <Card isText={ item.type=='text'? true : false}
                    value={item.value}
                />)}
            keyExtractor={item => item._id}

        />
        // </View>
        // <Text>Hiii brooo</Text>
    )
  
}

// const Home = () => {
//     return (
//         <ScrollView>
//             <View style={{flex:1, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center',
//         flexDirection: 'row'}}>
//             <Card isText={true} value='Less check it out' />
//             <Card isText={true} value='Here we goooo,, gehhwbfbewbvkjegwbgjkgbewbjk' />
//             <Card isText={true} value='Here we goooo,, gehhwbfbewbvkjegwbgjkgbewbjk' />
//             <Card isText={true} value='Here we goooo,, gehhwbfbewbvkjegwbgjkgbewbjk' />
//             <Card isText={true} value='Before your interviews, make a presentation, and you can follow the below flow while making it:

// 🎯 Problem Statement: Highlight the problem that inspired your project.
// 🔧 Tech Stack Used: Explain your tech choices and the reasons behind them.
// 💰 Cost Estimate: Break down project components and compare predicted vs. actual time.
// 📈 High-Level Design: Use visuals to showcase project architecture and flow.
// 🎬 Demo: Bring your project to life with GIFs or engaging screen-sharing.
// ⚡ Challenges Faced: Discuss hurdles and the approaches you took to overcome them.
// 📑 Low-Level Design (optional): Offer an overview of your code structure.'/>
            
//             <Card isText={false} value='https://images.unsplash.com/photo-1579546928937-641f7ac9bced?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=678&q=80'/>
//             <Card isText={false} value='https://images.unsplash.com/photo-1628744301791-d416de069399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2854&q=80' />
//             </View>
//         </ScrollView>
//     )
// }

export default Home