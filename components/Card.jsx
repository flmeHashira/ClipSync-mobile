import React, { useState }from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable
} from 'react-native';

import CustomImage from './CustomImage'
import * as Clipboard from 'expo-clipboard'

const Card = (props) => {
    // function handlePress() {
    //     if(props.isText)
    //         Clipboard.setStringAsync(props.value)
    //     else    {
    //         const base64 = props.value.split(';base64,')[1]
    //         Clipboard.setImageAsync(base64)
    //     }
    // }
    return (
        <View style={{borderRadius: 20, overflow: 'hidden', margin: 15}}>

            <Pressable 
            android_ripple={{ borderless:false, foreground:true}}
            onPress={() => props.handlePress(props.isText, props.value) }>
            {props.isText ? <View style={styles.cardWrapperText}>
                                <Text numberOfLines={7} ellipsizeMode='tail' style={{padding:10}} >{props.value}</Text>
                            </View>
                        :
                            <View style={styles.cardWrapperImg}>
                                <CustomImage source={props.value}/>
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
        aspectRatio: 1,
        backgroundColor: '#ebedee',

    },
    cardWrapperImg: {
        backgroundColor: '#ebedee',
    }
})

export default Card