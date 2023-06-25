import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core'

const MatchScreen = () => {

    const navigation = useNavigation()
    const { params } = useRoute()
    const { userInfo, acceptedUser } = params;

    console.log("userInfo", userInfo)

    return (
        <View style={{height: '100%', backgroundColor: '#00233b', alignItems: 'center', paddingTop: 90, position: 'relative'}}>
            <MaterialCommunityIcons name="party-popper" size={60} color="#fff" />
            <Text style={{color: '#fff', textAlign: 'center'}}>Matched it!</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, width: '100%', marginTop: 60}}>
                <Image source={{uri: userInfo.photoURL}} style={styles.image}/>
                <Image source={{uri: acceptedUser.photoURL}} style={styles.image}/>
            </View>
            <TouchableOpacity onPress={()=>{
                navigation.goBack()
                navigation.navigate('ChatScreen')
            }} style={styles.chatButton}>
                <Text style={{color: '#00233b', textAlign: 'center'}}>Chat</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MatchScreen

const styles= StyleSheet.create({
    image:{
        width: 150,
        height: 150,
        borderRadius: 50

    },
    chatButton: {
        padding: 20,
        borderRadius: 25,
        marginTop: 20,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 20
    }
})