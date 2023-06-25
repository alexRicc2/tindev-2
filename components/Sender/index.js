import { View, Text } from 'react-native'
import React from 'react'

const Sender = ({message}) => {
  return (
    <View style={{padding: 10, borderRadius:5, borderTopRightRadius: 0,alignSelf: 'flex-start', marginLeft: 'auto' ,backgroundColor: '#2d3ce9', marginVertical: 5}}>
      <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>{message.content}</Text>
    </View>
  )
}

export default Sender