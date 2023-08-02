import React, { useState, useRef }from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import FastImage from 'react-native-fast-image'

const Card = (props) => {
    return (
        <TouchableNativeFeedback
          background={ TouchableNativeFeedback.SelectableBackground()}>
        {props.isText ? <View style={styles.cardWrapperText}>
                            <Text numberOfLines={7} ellipsizeMode='tail' style={{padding:10}} >{props.value}</Text>
                        </View>
                     :
                        <View style={styles.cardWrapperImg}>
                            <CardImg value={props.value} />
                        </View>
        }
        </TouchableNativeFeedback >
    )
}

const CardImg = (props) => {
    return (
        <FastImage
        style={styles.image}
        source={{
            uri: props.value,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}/>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
    },
    cardWrapperText: {
        width: '35%',
        borderRadius: 20,
        aspectRatio: 1,
        backgroundColor: '#ebedee',
        margin: 15,

    },
    cardWrapperImg: {
        width: '35%',
        backgroundColor: '#ebedee',
        margin: 15,
        borderRadius: 20,
    }
})

export default Card