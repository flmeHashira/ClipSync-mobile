import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import Card from './Card'

import realmContext, {clipContent} from './RealmAPIs'
const { useRealm, useQuery } = realmContext
import { useUser } from '@realm/react'


const renderFooter = () => {
  return (
    // Footer View with Loader
    <View style={styles.footer}>
      {loading ? (
        <ActivityIndicator
          color="black"
          style={{margin: 15}} />
      ) : null}
    </View>
  );
};


const Home = () => {
    const user = useUser()
    const realm = useRealm()
    const query = useQuery(clipContent).filtered("owner_id == $0", user.id)
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
          // Create subscription for filtered results.
          mutableSubs.add(query)
        });
      }, []);


    const collection = useMemo(() => (query.filtered("owner_id == $0", user.id)), [query])
    function renderItem({item}) {
      return <Card isText={ item.type=='text'? true : false} value={item.value}/>
    }
    return (
      <View style={styles.background}>
        <FlatList
          showsVerticalScrollIndicator = {false}
          numColumns={2}
          columnWrapperStyle = {{
              flex:1,
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'center',
              flexDirection: 'row'}}
          data = {collection}
          renderItem = {renderItem}
          keyExtractor = {item => item._id}
          // ListFooterComponent={renderFooter}
          // onEndReachedThreshold={0.5}
          />
          {/* <ScrollView>
            {collection.map(item =>  (
                <Card key={item._id} isText={item.type==='text' ? true: false} value={item.value}/>
              )
            )}
          </ScrollView> */}

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
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }
})

export default React.memo(Home)