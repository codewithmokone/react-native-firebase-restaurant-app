import { View, SafeAreaView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoc, doc } from 'firebase/firestore';
import * as Icon from "react-native-feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData } from '../redux/slices/userDataSlice';
import { Text } from 'react-native-paper';

export default function ProfileScreen() {

    const dispatch = useDispatch()
    const navigation = useNavigation();

    const { data } = useSelector(state => state.data) // Fetching data from redux
    const { user } = useSelector(state => state.user) // Fetching data from redux

    const [visible, setVisible] = useState(true);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    useEffect(()=>{
        // if(!user){
        //     userPrompt();
        // }

    },[])

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
                            const userDocRef = doc(db, 'users', user);
                            await deleteDoc(userDocRef);

                            // Delete the user from Firebase Authentication
                            const currentUser = auth.currentUser;
                            await currentUser.delete();

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
        AsyncStorage.removeItem('token');
        dispatch(setUserData(null))
        Alert.alert('Signed Out');
        navigation.navigate('Home');
    }

    // Prompts the user to login or sign up
    const userPrompt = () => {
        Alert.alert(
            'Sign Up or Login to continue',
            ' ',
            [
                {
                    text: 'Register',
                    onPress: () => navigation.navigate('Register'),
                    style: 'cancel',
                },
                {
                    text: 'Login',
                    onPress: () => navigation.navigate('Login'),
                    style: 'cancel',
                },
                {
                    text: 'Cancel',
                    onPress: () => navigation.navigate('Home'),
                    style: 'cancel',
                },
            ],
        );
    }

    if (data) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ marginVertical: 20, fontWeight: '700', fontSize: 30, color: '#52A63C' }}>{data.name}</Text>
                            <Text>{data.email}</Text>
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
                        <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => navigation.navigate('OrderDetails', { user })}
                            >
                                <Icon.CreditCard strokeWidth={3} stroke={'#52A63C'} />
                                <Text style={{ marginLeft: 10 }}>Orders</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => navigation.navigate('PaymentDetails', { ...data })}
                            >
                                <Icon.CreditCard strokeWidth={3} stroke={'#52A63C'} />
                                <Text style={{ marginLeft: 10 }}>Payment Details</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={handleDeleteAccount}
                            >
                                <Icon.Delete strokeWidth={3} stroke={'#52A63C'} />
                                <Text style={{ marginLeft: 10 }}>Delete Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View style={{ justifyContent:'flex-end', width: '100%',borderWidth:1,height:300}}> */}
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={handleLogout}
                        >
                            <Text style={{ color: 'white' }}>Log out</Text>
                        </TouchableOpacity>
                    
                </View>
            </SafeAreaView>
        )
    } else {
        userPrompt();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'offwhite',
    },
    logoutButton: {
        marginHorizontal: 10,
        backgroundColor: '#52A63C',
        width: '95%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        position:'absolute',
        bottom:10
    }
})