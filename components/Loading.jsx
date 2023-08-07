import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  ActivityIndicator
} from 'react-native'



const Loading = () => {
  const jumpAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Jump animation
    Animated.loop(
      Animated.timing(jumpAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [])

  const jumpValues = {
    borderBottomRightRadius: jumpAnim.interpolate({
      inputRange: [0.15, 0.5],
      outputRange: [3, 15],
    }),
    transform: [
      {
        translateY: jumpAnim.interpolate({
          inputRange: [0.25, 0.5, 0.75, 1],
          outputRange: [10, 20,  10, 0],
        }),
      },
      {
        rotate: jumpAnim.interpolate({
          inputRange: [0.25, 0.5, 0.75, 1],
          outputRange: ['22.5deg', '45deg', '67.5deg', '90deg'],
        }),
      },
    ],
  };


  return (
    <View style={styles.container}>
    {/* <Animated.View style={[styles.spinner, jumpValues]} /> */}
    <ActivityIndicator size="large" color="#f08080" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    width: 50,
    height: 50,
    backgroundColor: '#f08080',
    borderRadius: 5,
  }
})



export default Loading