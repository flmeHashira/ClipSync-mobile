import {
    StyleSheet,
    Text,
    View,
    Pressable
  } from 'react-native';

const Btn = (props) => {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={props.handleClick}
          android_ripple={{ color: '#00000030', borderless: false }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#3498db30' : '#FF4B2B',
            },
            styles.button,
          ]}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12}}>{props.text}</Text>
        </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        overflow: 'hidden',
        borderRadius: 20,
      },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
    },
})

export default Btn
