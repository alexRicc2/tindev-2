import { View, Text } from 'react-native'
import React from 'react'

const Receiver = ({message}) => {
  return (
    <View style={{padding: 10, borderRadius:5, borderTopLeftRadius: 0,alignSelf: 'flex-start', marginRight: 'auto' ,backgroundColor: '#fa0eb8', marginVertical: 5}}>
    <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>{message.content}</Text>
  </View>
  )
}

export default Receiver