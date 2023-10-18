import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { deleteDoc, doc } from 'firebase/firestore';
import * as Icon from "react-native-feather";

export default function ProfileScreen() {

    const { data } = useSelector(state => state.data)
    const { user } = useSelector(state => state.user)

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
        Alert.alert('Signed Out')
        // navigation.navigate('Login');
    }

    if(data){

        const [userInfo, setUserInfo] = useState(data);

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'offwhite' }}>
                        <View>
                            <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ marginVertical: 20, fontWeight: '700', fontSize: 30, color: '#52A63C' }}>{userInfo.name}</Text>
                                    <Text>{userInfo.email}</Text>
                                </View>
                            </View>
                            <View style={{ marginVertical: 30 }}>
                                <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center' }}
                                        onPress={() => navigation.navigate('EditProfile')}
                                    >
                                        <Icon.Edit2 strokeWidth={3} stroke={'#52A63C'} />
                                        <Text style={{ marginLeft: 10 }}>Edit Account</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginHorizontal: 15,  marginVertical: 15 }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center' }}
                                        onPress={() => navigation.navigate('PaymentDetails', { ...userInfo })}
                                    >
                                        <Icon.CreditCard strokeWidth={3} stroke={'#52A63C'} />
                                        <Text style={{ marginLeft: 10 }}>Payment Details</Text>
                                    </TouchableOpacity>
                                </View>
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
                            <View style={{ position: 'absolute', bottom: -300, width: '100%', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{ marginHorizontal: 10, backgroundColor: '#52A63C', width: 300, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
                                    onPress={handleLogout}
                                >
                                    <Text style={{ color: 'white' }}>Log out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
            </SafeAreaView>
        )
    }else{
        return (
            <SafeAreaView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Please login to view profile</Text>
                    <TouchableOpacity
                        style={{marginVertical: 50, backgroundColor: '#52A63C', width: 200, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

   
}