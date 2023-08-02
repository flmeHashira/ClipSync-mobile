import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import Card from './Card'

import realmContext, {clipContent} from './RealmAPIs'
const { useRealm, useQuery } = realmContext
import { useUser } from '@realm/react'


const Home = () => {
    const user = useUser()
    const realm = useRealm()
    const query = useQuery(clipContent)
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
          // Create subscription for filtered results.
          mutableSubs.add(query.filtered("owner_id == $0", user.id))
        });
      }, []);

    const collection = useMemo(() => (query.filtered("owner_id == $0", user.id)), [query])
    renderItem= ({ item }) => (<Card isText={ item.type=='text'? true : false} value={item.value}/>)

    return (
      <View style={styles.background}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{
              flex:1,
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'center',
              flexDirection: 'row'}}
          renderItem={renderItem}
          data={collection}
          keyExtractor={item => item._id}
          />
      </View>

    )
  
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    flex: 1,
    backgroundColor: '#f7f8fa',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})



export default Home