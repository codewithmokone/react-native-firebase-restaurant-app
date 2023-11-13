import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { collection, doc, getDoc } from 'firebase/firestore';
import { setUserData } from '../redux/slices/userDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from 'react-native-paper';

function LoginScreen() {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handles user login
    const handleLogin = async () => {

        // Input validation
        if (!email || !password) {
            Alert.alert('Validation Error', 'Please enter both email and password.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;
            let userId = user.uid
            dispatch(setUser(userId))

            if (userId) {
                try {
                    const userCollection = collection(db, 'users');
                    const userDocRef = doc(userCollection, userId);
                    const userDocSnapshot = await getDoc(userDocRef);

                    if (userDocSnapshot.exists()) {
                        const userInfo = userDocSnapshot.data();
                        // console.log("Logged In Screen: ", userData)
                        AsyncStorage.setItem('token', JSON.stringify(userInfo))
                        dispatch(setUserData(userInfo));
                    } else {
                        console.log('Failed to get user infromation');
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            navigation.goBack()
            // dispatch(setUser(userId))
        } catch (err) {
            console.log('Error login in ', err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.heading} >
                    <Title style={{ fontSize: 28, color: 'white' }}>
                        Login
                    </Title>
                    <Text style={{ color: 'white', marginTop: 10, fontSize: 16 }}>Please Sign in to continue.</Text>
                </View>
                <View style={styles.inputSection}>
                    <TextInput
                        style={{ marginTop: 15, backgroundColor: 'white', borderRadius: 10, height: 50 }}
                        required
                        placeholder=' Email'
                        onChangeText={(text) => setEmail(text)}
                    />

                    <TextInput
                        style={{ marginTop: 15, borderRadius: 10, backgroundColor: 'white', height: 50 }}
                        placeholder=' Password'
                        required
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={{ width: '90%', marginTop: 30 }}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{ width: 350, height: 50, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ color: 'green', fontSize: 20 }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>Haven't registered? </Text>
                    <Pressable
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: 'white' }}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#52A63C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        width: '90%',
        marginBottom: 20
    },
    headingText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    loginNavLink: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    inputSection: {
        width: '90%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50,
        marginTop: 5,
        height: 50,

        marginBottom: 15,
    },
});