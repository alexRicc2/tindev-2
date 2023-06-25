import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
const ChatHeader = ({ title = 'Chats with your matches', photoURL = null }) => {
    const navigation = useNavigation()
    return (
        <View
            style={{ paddingHorizontal: 20, backgroundColor: '#fff', paddingVertical: 10, marginBottom: 10, gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }}>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>

            </View>
            {photoURL &&
            <Image source={{uri: photoURL}} style={{width: 30, height: 30, borderRadius: 15}}/>
            }
        </View>
    )
}

export default ChatHeader