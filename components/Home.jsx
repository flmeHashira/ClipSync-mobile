import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';

import Card from './Card'
 
import realmContext, {clipContent} from '../RealmAPIs'
const { useRealm, useQuery } = realmContext
import { useUser } from '@realm/react'
import * as Clipboard from 'expo-clipboard'

function imageHasDiff(image, lastImage) {
    return lastImage && image.data.split(';base64,')[1] === lastImage.data.split(';base64,')[1]
}

const Home = () => {

    const user = useUser()
    const realm = useRealm()
    const lastText = useRef('')
    const lastImage = useRef('')
    const query = useQuery(clipContent).filtered("owner_id == $0", user.id)

    function clipChanged(isText, value) {
      if(isText)  {
        realm.write(() => {
          realm.create('clipContent', {
            owner_id: user.id,
            _id: new Realm.BSON.UUID(),
            type: 'text',
            value: value
          })
        })
      } else  {
        realm.write(() => {
          realm.create('clipContent', {
            owner_id: user.id,
            _id: new Realm.BSON.UUID(),
            type: 'image',
            value: value
          })
        })
      }
    }


    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
          mutableSubs.add(query)
        })
    }, [])

    useEffect(() => {
      // const query = await useQuery(clipContent).filtered("owner_id == $0", user.id)
      const lastElem = query.slice(-1)
      lastElem.type == 'text' ? lastText.current = lastElem.value :
                               lastImage.current = lastElem.value

      const watcher = setTimeout(async () => {

        const text = await Clipboard.getStringAsync()
        const image = await Clipboard.getImageAsync({ format: 'png' })
        if (imageHasDiff(image, lastImage.current)) {
          lastImage.current = image
          clipChanged(false, image.data.split(';base64,')[1])
          // console.log('image changed')
        }
        if (lastText && text !== lastText.current) {
            lastText.current = text
            clipChanged(true, text)
            // console.log("text changed")
        }
      }, 800);

      return () => clearTimeout(watcher)
    }, [])

    function handePress(isText, value) {
      if(isText)  {
        lastText.current = value
        Clipboard.setStringAsync(value)
      } else {
        // console.log('image', value)
        const base64 = value.split(';base64,')[1]
        lastImage.current = base64
        Clipboard.setImageAsync(base64)
      }
    }

    const collection = useMemo(() => (query.filtered("owner_id == $0", user.id)), [query])
    function renderItem({item}) {
      // console.log(item._id)
      return <Card isText={ item.type=='text'? true : false} value={item.value} handlePress={handePress}/>
    }
    return (
      <View style={styles.background}>
        {collection.length === 0 ?  <Card isText={true} value={'Welcome to Clip Sync, your recent clipboard history will be saved here.'}/>
        : <FlatList
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
          />
          }
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

export default Home