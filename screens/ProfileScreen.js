import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import * as Icon from "react-native-feather";
import { setUserDetails } from '../redux/slices/userDetailsSlice';


export default function ProfileScreen() {

    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const { user } = useSelector(state => state.user)

    console.log(user)

    const dispatch = useDispatch();

    const navigation = useNavigation();

    // Function to handle account deletion
    const handleDeleteAccount = async () => {

        try {
            Alert.alert(
                'Confirmation',
                'Are you sure you want to delete your account?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: async () => {
                      // Delete the Firestore document
                      const userDocRef = doc(db, 'users', user.userId);
                      await deleteDoc(userDocRef);
        
                      // Delete the user from Firebase Authentication
                      const currentUser = auth.currentUser;
                      await currentUser.delete();
        
                      // Sign the user out (optional)
                      auth.signOut();
        
                      // Navigate to a screen (e.g., a login screen) after deletion
                      navigation.navigate('Login');
                    },
                    style: 'destructive', // Red color for the delete button
                  },
                ]
              );

          
        } catch (error) {
            console.error('Error deleting account:', error);
            // Handle error and display an alert if necessary
            Alert.alert('Error', 'Failed to delete account. Please try again.');
        }
    }

    // Handles signing out user
    const handleLogout = async () => {
        await signOut(auth);
        navigation.navigate('Login');
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
                    dispatch(setUserDetails(userData));
                } else {
                    console.log('Failed to get user infromation');
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }
        }
    }


    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'offwhite' }}>
            {
                isLoading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                ) : (
                    <View>
                        <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ marginVertical: 20, fontWeight: '700', fontSize: 30, color: '#52A63C' }}>{userInfo.name}</Text>
                                <Text>{userInfo.email}</Text>
                            </View>
                        </View>
                        {/* <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ position: "absolute", top: 50, left: 16, backgroundColor: '#52A63C', padding: 4, borderRadius: '100%' }}
                >
                    <Icon.ArrowLeft strokeWidth={3} stroke={'white'} />
                </TouchableOpacity> */}
                        {/* <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile')}
                        style={{ marginLeft: 10, marginVertical: 10, backgroundColor: '#52A63C', width: 180, height: 30, justifyContent: 'center', borderRadius: 10 }}
                    >
                        <Text style={{ textAlign: 'center', color: 'white' }}>Edit Profile</Text>
                    </TouchableOpacity>
                </View> */}
                        <View style={{ marginVertical: 30 }}>
                            <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => navigation.navigate('EditProfile')}
                                >
                                    <Icon.User strokeWidth={3} stroke={'#52A63C'} />
                                    <Text style={{ marginLeft: 10 }}>Edit Account</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ marginHorizontal: 15,  marginVertical: 15 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => navigation.navigate('PaymentDetails', { ...userInfo })}
                                >
                                    <Icon.CreditCard strokeWidth={3} stroke={'#52A63C'} />
                                    <Text style={{ marginLeft: 10 }}>Payment Details</Text>
                                </TouchableOpacity>
                            </View> */}
                            <View style={{ marginHorizontal: 15,  marginVertical: 15 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                    onPress={handleDeleteAccount}
                                >
                                    <Icon.Delete strokeWidth={3} stroke={'#52A63C'} />
                                    <Text style={{ marginLeft: 10 }}>Delete Account</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', bottom: -350, width: '100%', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ marginHorizontal: 10, backgroundColor: '#52A63C', width: 300, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
                                onPress={handleLogout}
                            >
                                <Text style={{ color: 'white' }}>Log out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
    )
}