import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { collection, doc, getDoc } from 'firebase/firestore';
import { setUserData } from '../redux/slices/userDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Title } from 'react-native-paper';

function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation()
    const dispatch = useDispatch()

    // Handles user login
    const handleLogin = async () => {
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
                    <Title style={{ fontSize: 25, color: 'white' }}>
                        Login to Account
                    </Title>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                    <Text>Haven't registered? </Text>
                    <Pressable
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: 'blue' }}>Sign Up</Text>
                    </Pressable>
                </View>
                <View style={styles.inputSection}>
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        onChangeText={text => setEmail(text)} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                    /> */}
                    <TextInput
                        style={{ marginTop: 2 }}
                        label='Email'
                        mode='outlined'
                        required
                        activeOutlineColor='green'
                    />
                    <TextInput
                        style={{ marginTop: 15 }}
                        label='Password'
                        mode='outlined'
                        required
                        activeOutlineColor='green'
                    />
                </View>
                <View style={{ width: '90%', marginTop:15 }}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{ width: 350, height: 50, borderRadius: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ color: 'green', fontSize: 20 }}>Login</Text>
                    </TouchableOpacity>
                    {/* <Button
                        style={{ marginTop: 15, alignContent:"center" }}
                        icon="send"
                        mode="contained"
                        onPress={handleLogin}
                        buttonColor='white'
                        textColor='green'
                    >
                        Login
                    </Button> */}
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