import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import useAuth from "../hooks/useAuth";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useNavigation } from "@react-navigation/core";
const ChatScreen = () => {

  const [matches, setMatches] = useState([])
  const { user } = useAuth();
  const userId = user.uid
  const navigation = useNavigation()
  useEffect(() =>
    onSnapshot(
      query(collection(db, "matches"), where("usersMatched", "array-contains", user.uid)),
      (snapshot) => setMatches(snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data()
      })))
    )
    , [user])

  return (
    <View>
      <ChatHeader />
      {matches.length === 0 ?
        <Text style={{paddingHorizontal: 20, marginTop: 10}}>Sorry you have no matches</Text>
        :
        <View style={{margin: 10}}>
        <Text>You have {matches.length} match(s)</Text>
        <FlatList data={matches}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            // console.log('item:', item)
          
            // we fetch matches from firestore, but the data is stored with users object that contains both users, so we manipulate the data to get only the accepted user
            const users = item.users
            const newUser = {...users}
            delete newUser[userId]

            const [id, user] = Object.entries(newUser).flat()


            return (
              <TouchableOpacity 
              onPress={()=> navigation.navigate('MessageScreen',{userToChatWith: user, matchId: item.id} )} 
              style={{backgroundColor: "#fff", padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10, borderRadius: 10}}>
                <Image source={{uri: user.photoURL}} style={{width: 50, height: 50, borderRadius: 15}}/>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{user.displayName}</Text>
              </TouchableOpacity>
            )
          }
        }
        />
        </View>
      }

    </View>
  );
};

export default ChatScreen;
