import React, { useState, useRef }from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Pressable
} from 'react-native';

import FastImage from 'react-native-fast-image'

const Card = (props) => {
    return (
        <View style={{borderRadius: 20, overflow: 'hidden', margin: 15}}>

            <Pressable 
            android_ripple={{ borderless:false, foreground:true}}>
            {props.isText ? <View style={styles.cardWrapperText}>
                                <Text numberOfLines={7} ellipsizeMode='tail' style={{padding:10}} >{props.value}</Text>
                            </View>
                        :
                            <View style={styles.cardWrapperImg}>
                                <CardImg value={props.value} />
                            </View>
            }
            </Pressable>
        </View>
    )

    // return (
    //     <TouchableOpacity>
    //     {props.isText ? <ScrollView style={styles.cardWrapperText}>
    //                         <Text numberOfLines={7} ellipsizeMode='tail' style={{padding:10}} >{props.value}</Text>
    //                     </ScrollView>
    //                  :
    //                     <ScrollView style={styles.cardWrapperImg}>
    //                         <CardImg value={props.value} />
    //                     </ScrollView>
    //     }
    //     </TouchableOpacity>
    // )
}
function getWidth(ratio)    {
    if(ratio>1.4)
        return 150
    else if(ratio<0.75)
        return 300
}

const CardImg = (props) => {
    const [ratio, setRatio] = useState(0)
    Image.getSize(props.value, (w, h) => {
        setRatio(w/h)
    })

    return (
        <FastImage
        style={{width:getWidth(ratio), aspectRatio: ratio}}
        source={{
            uri: props.value,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}/>
    )
}

const styles = StyleSheet.create({
    image: {
        // height: 200,
    },
    cardWrapperText: {
        width: 150,
        // borderRadius: 20,
        aspectRatio: 1,
        backgroundColor: '#ebedee',
        // margin: 15,

    },
    cardWrapperImg: {
        width: '35%',
        backgroundColor: '#ebedee',
        // margin: 15,
        // borderRadius: 20,
    }
})

export default Card