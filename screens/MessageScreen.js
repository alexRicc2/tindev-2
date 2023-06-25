import { View, Text, TextInput, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/core'
import ChatHeader from '../components/ChatHeader'
import useAuth from '../hooks/useAuth'
import Receiver from '../components/Receiver'
import Sender from '../components/Sender'
import {addDoc, collection, serverTimestamp, onSnapshot, query, orderBy} from 'firebase/firestore'
import {db} from '../firebaseConfig'

const MessageScreen = () => {
    const { params } = useRoute()
    const { userToChatWith, matchId } = params
    const { user } = useAuth();
    // console.log('user to chat with', userToChatWith)

    const [textMessage, setTextMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(()=>
        onSnapshot(query(collection(db, 'matches', matchId, 'messages'), orderBy('timestamp', 'desc')),
        snapshot=> setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))))
    , [userToChatWith, matchId, db])

    const send = () => {
        addDoc(collection(db, 'matches', matchId, 'messages'), {
            userId: user.uid,
            displayName: user.displayName,
            content: textMessage,
            timestamp: serverTimestamp()
        })
        setTextMessage('')
    }
    // console.log('messages:', messages)
    return (
        <View style={{ flex: 1 }}>
            <ChatHeader title={userToChatWith.displayName} photoURL={userToChatWith.photoURL}/>
            <Text style={{paddingHorizontal: 20}}>messages count: {messages.length}</Text>
            <KeyboardAvoidingView

                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, paddingHorizontal: 20 }}
                keyboardVerticalOffset={30}
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id}
                        inverted={-1}
                        renderItem={( {item} ) => {
                            // console.log("message item", item)
                            return item.userId === user.uid ?
                                (<Sender  key={item.id} message={item}/>) : (<Receiver key={item.id}  message={item}/>)
                        }}
                    />
                </TouchableWithoutFeedback>

                <View style={{ borderColor: '#ccc', borderWidth: 2, borderRadius: 25,paddingHorizontal: 20, paddingVertical: 10, marginVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TextInput
                        placeholder='write a message..'
                        onChangeText={(text) => setTextMessage(text)}
                        value={textMessage}
                        style={{ flex: 1 }}
                        onSubmitEditing={send}
                    />
                    <TouchableOpacity onPress={send} >
                        <Text>send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default MessageScreen