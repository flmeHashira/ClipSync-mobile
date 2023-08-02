import React, { useState, useRef }from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

const Card = (props) => {
    return (
        <TouchableNativeFeedback
          background={
            Platform.OS === 'android'
              ? TouchableNativeFeedback.SelectableBackground()
              : undefined
          }>
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

const getWidth = (ratio) => {
    if (ratio < 0.75) {
        return '100%'
    }
    if (ratio > 1.4) {
        return '100%'
    }
}

const CardImg = (props) => {
    const [ratio, setRatio] = useState(0)
    Image.getSize(props.value, (w, h) => {
        setRatio(w/h)
    })

    return (
        <Image style={{...styles.image, width: getWidth(ratio)}} source={{uri:props.value}} resizeMode='stretch'/>
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