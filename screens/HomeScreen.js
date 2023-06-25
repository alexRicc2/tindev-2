import { View, Text, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons';
import { useLayoutEffect } from "react";
import Swiper from 'react-native-deck-swiper'
import { DATA } from "../assets/data/dummyUsers";
import { onSnapshot, doc, setDoc, collection, getDocs, query, where, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../firebaseConfig";

const dumbArray = ['A']

const HomeScreen = () => {
  const { signOut, user } = useAuth()

  const navigation = useNavigation();
  const [users, setUsers] = useState([])
  const swiperRef = useRef(null);

  //get all users from database, filter the user itself, and map them to the users State
  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const rejects = await getDocs(collection(db, "users", user.uid, "rejects")).then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      )
      const rejectsArray = rejects.length > 0 ? rejects : dumbArray
      
      const accepts = await getDocs(collection(db, "users", user.uid, "accepts")).then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      )
      const acceptsArray = accepts.length > 0 ? accepts : dumbArray


      // console.log('rejecteds', rejects)

      unsub = onSnapshot(query(collection(db, 'users'), where("id", "not-in", [...rejectsArray, ...acceptsArray])), snapshot => {
        setUsers(
          snapshot.docs.filter(doc => doc.id !== user.uid).map(doc => (
            {
              id: doc.id,
              ...doc.data(),
            }
          ))
        )
      })
    }
    fetchCards();
    return unsub;
  }, [db])


  // console.log('users', users)
  //redirect to modalScreen if current logged user is not in firestore db
  useLayoutEffect(() => onSnapshot(doc(db, "users", user.uid), (snapshot) => {
    if (!snapshot.exists()) {
      navigation.navigate("ModalRegisterScreen")
    }
  }), [])

  const rejectUser = (cardIndex) => {
    //to use dumbydata or no users in db
    if (!users[cardIndex]) return;
    const rejectedUser = users[cardIndex];

    //put the user id rejected into rejects table for the current user
    setDoc(doc(db, "users", user.uid, "rejects", rejectedUser.id), rejectedUser)
  }

  const acceptUser = async (cardIndex) => {
    if(!users[cardIndex])return;
    const acceptedUser = users[cardIndex]

    const userInfo = await ( 
      await getDoc(doc(db, 'users', user.uid))).data()
    
    getDoc(doc(db, "users", acceptedUser.id, 'accepts', user.uid)).then((documentSnapshot)=>{
      if(documentSnapshot.exists()){
        console.log("matched")
        setDoc(doc(db, 'users', user.uid, "accepts", acceptedUser.id), acceptedUser)

        setDoc(doc(db, "matches", generateNewId(user.uid, acceptedUser.id)), {
          users: {
            [user.uid]: userInfo,
            [acceptedUser.id]: acceptedUser
          },
          usersMatched: [user.uid, acceptedUser.id],
          timestamp: serverTimestamp()
        })
        navigation.navigate('MatchScreen', {
          userInfo, acceptedUser
        })
      }
      else{
        setDoc(doc(db, "users", user.uid, "accepts", acceptedUser.id), acceptedUser)
      }
    })

  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', position: 'relative', justifyContent: 'space-between', flexDirection: 'row', padding: 5 }}>
        <TouchableOpacity onPress={signOut}>
          <Image source={{ uri: user.photoURL }} style={{ height: 40, width: 40, borderRadius: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ModalRegisterScreen')}>
          <Image source={require('../assets/icon.png')} style={{ height: 50, width: 50 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
          <Ionicons name="chatbox" size={40} color="#00233b" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: -12 }}>
        <Swiper
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          cards={users}
          onSwipedRight={(cardIndex) => rejectUser(cardIndex)}
          onSwipedLeft={(cardIndex)=> acceptUser(cardIndex)}
          ref={swiperRef}
          overlayLabels={{
            right: {
              title: "FALSE",
              style: {
                label: {
                  color: "#FF5964",
                  textAlign: "left"
                }
              }
            },
            left: {
              title: "TRUE",
              style: {
                label: {
                  color: "#02A9EA",
                  textAlign: "right"
                }
              }
            }
          }}
          containerStyle={{ backgroundColor: 'transparent' }}
          renderCard={card => card ? (

            <View key={card.id} style={{ position: 'relative', backgroundColor: '#ccc', height: '75%', borderRadius: 25 }}>
              <Image
                source={{ uri: card.photoURL }}
                style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: 25 }}
              />
              <View style={{ alignItems: 'center', backgroundColor: '#fff', width: '100%', position: 'absolute', bottom: 0, height: 60, flexDirection: 'row', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, justifyContent: 'space-between', padding: 10 }}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {card.displayName}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', color: '#00233b' }}>Tech: </Text>
                    <Text> {card.language}</Text>

                  </View>
                </View>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{card.age}</Text>
              </View>
            </View>
          ) : (
            <View style={{ backgroundColor: "#ccc", position: 'relative', height: "75%", borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ marginBottom: 10 }}>No more devs</Text>
              <FontAwesome5 name="sad-cry" size={80} color="#00233b" />
            </View>
          )
          }
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => swiperRef.current.swipeLeft()} style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, backgroundColor: '#02A9EA', borderRadius: 25 }}>
          <Entypo name="check" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swiperRef.current.swipeRight()}
          style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, backgroundColor: '#FF5964', borderRadius: 25 }}>
          <Entypo name="cross" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const generateNewId = (id1, id2) => id1 > id2 ? id1 + id2 : id2 + id1