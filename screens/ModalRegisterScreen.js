import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { db } from '../firebaseConfig'
import { useNavigation } from '@react-navigation/core'


const ModalRegisterScreen = () => {
    const { user } = useAuth()
    const [tech, setTech] = useState(null)
    const [age, setAge] = useState(null)
    const [photoURL, setPhotoURL] = useState(null)
    const navigation = useNavigation()
    const sendToFirestore = () => {
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: photoURL,
            language: tech,
            age: age,
            timestamp: serverTimestamp()
        }).then(() => {
            navigation.navigate('HomeScreen')
        }).catch(error => {
            alert(error.message)
        })
    }

    const completedForm = photoURL && tech && age

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}>
            <Image source={require('../assets/logo.png')} style={{ width: 40, height: 40 }} />
            <Text>{user.displayName}: Set up your account</Text>
            <View style={{marginVertical: 10}}>
                <Text>Put your favotire Tech</Text>
                <TextInput placeholder='Javascript'
                    value={tech}
                    onChangeText={(text)=>setTech(text)}
                />
            </View>
            <View style={{marginVertical: 10}}>
                <Text>Put your age</Text>
                <TextInput placeholder="21"
                    value={age}
                    
                    onChangeText={(text)=> setAge(text)}
                />
            </View>
            <View style={{marginVertical: 10}}>
                <Text>Put your profile image URL</Text>
                <TextInput placeholder="image url"
                    value={photoURL}
                    
                    onChangeText={(text)=> setPhotoURL(text)}
                />
            </View>

            <TouchableOpacity onPress={sendToFirestore} style={[{borderRadius: 25 ,padding: 10, backgroundColor: "green"}, !completedForm && {backgroundColor: '#333333'}]} disabled={!completedForm}>
                <Text style={{color: "#fff"}}>Send to firestore</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalRegisterScreen