import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { collection, doc, documentId, getDoc, getDocs, query, where } from 'firebase/firestore';

export default function ProfileScreen() {

    const [userInfo, setUserInfo] = useState([]);

    const { user } = useSelector(state => state.user)

    const navigation = useNavigation();

    // Handles signing out user
    const handleLogout = async () => {
        await signOut(auth)
    }

    // Handles fetching the user data from firestore
    const fetchUserInfo = async () => {

        const userId = user.uid

        if (userId) {
            try {
                const userCollection = collection(db, 'users');
                const userDocRef = doc(userCollection, userId);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    setUserInfo(userData);
                } else {
                    console.log('Failed to get user infromation')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'offwhite' }}>
            <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ marginVertical: 20, fontWeight: '700', fontSize: 30 }}>{userInfo.name}</Text>
                    <Text>{userInfo.email}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}
                    style={{ marginLeft: 10, marginVertical: 10, backgroundColor: 'blue', width: 180, height: 30, justifyContent: 'center', borderRadius: 10 }}
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View style={{ marginHorizontal: 10 }}>
                    <TouchableOpacity>
                        <Text>Payment</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 0, marginVertical: 40 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={handleLogout}
                    >
                        <Text>Log out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}