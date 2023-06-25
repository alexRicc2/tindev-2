import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'

const MatchScreen = () => {

    const navigation = useNavigation()
    const { params } = useRoute()
    const { userInfo, acceptedUser } = params;



    return (
        <View style={{height: '100%', backgroundColor: '#00233b'}}>
            <Text>MatchScreen</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20}}>
                <Image source={{uri: userInfo.photoURL}} style={styles.image}/>
                <Image source={{uri: acceptedUser.photoURL}} style={styles.image}/>
            </View>
            <TouchableOpacity onPress={()=>{
                navigation.goBack()
                navigation.navigate('ChatScreen')
            }} style={styles.chatButton}>
                <Text style={{color: '#fff'}}>Chat</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MatchScreen

const styles= StyleSheet.create({
    image:{
        width: 50,
        height: 50,
        borderRadius: 25

    },
    chatButton: {
        padding: 20,
        borderRadius: 25,
        marginTop: 20,
        backgroundColor: '#00233b',

    }
})