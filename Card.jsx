import React, { useState }from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable
} from 'react-native';

import Image from 'react-native-scalable-image'
import * as Clipboard from 'expo-clipboard'

const Card = (props) => {
    function handlePress() {
        if(props.isText)
            Clipboard.setStringAsync(props.value)
        else    {
            const base64 = props.value.split(';base64,')[1]
            Clipboard.setImageAsync(base64)
        }
    }
    return (
        <View style={{borderRadius: 20, overflow: 'hidden', margin: 15}}>

            <Pressable 
            android_ripple={{ borderless:false, foreground:true}}
            onPress={ handlePress }>
            {props.isText ? <View style={styles.cardWrapperText}>
                                <Text numberOfLines={7} ellipsizeMode='tail' style={{padding:10}} >{props.value}</Text>
                            </View>
                        :
                            <View style={styles.cardWrapperImg}>
                                <Image width={150} source={{uri: props.value}} />
                            </View>
            }
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
    },
    cardWrapperText: {
        width: 150,
        // borderRadius: 20,
        aspectRatio: 1,
        backgroundColor: '#ebedee',
        // margin: 15,

    },
    cardWrapperImg: {
        backgroundColor: '#ebedee',
        // margin: 15,
        // borderRadius: 20,
    }
})

export default Card