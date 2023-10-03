import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { auth } from '../config/firebase';
import { ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

function LoginScreen() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigation = useNavigation()

    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, u => {
            dispatch(setUser(u));
        })
        return unsubscribe;
    }, [dispatch])
   
    // Handles user login
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            alert('Logged in successfully')
            navigation.navigate('Home');
        } catch (err) {
            console.log('Error login in ', err)
        }
    }

    // Handles navigating to the login page
    const handleNavigate = () => {
        navigation.navigate('Register');
    }

    console.log("Checking for user: ",user)

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../assets/images/LoginScreen.jpg")}
                style={{
                    flex: 1, height: '100%', width: '100%', alignItems: 'center',
                    juatifyContent: 'center', alignItems: 'center',
                    justifyContent: 'center',
                }} resizeMode='cover'
            >
                <View style={styles.heading} >
                    <Text style={{ fontSize: 25 }}>Login to Account</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                    <Text>Haven't registered? </Text>
                    <Pressable
                        onPress={handleNavigate}>
                        <Text style={{ color: 'blue' }}>Sign Up</Text>
                    </Pressable>
                </View>
                <View style={styles.inputSection}>
                    <Text>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=" Enter your email"
                        onChangeText={text => setEmail(text)} />
                    <Text>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=" Enter your password"
                        onChangeText={text => setPassword(text)} />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Pressable style={{ width: 310, height: 40, borderRadius: 10, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center' }} onPress={handleLogin}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
                    </Pressable>
                </View>
            </ImageBackground>

        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        height: 40,
        marginBottom: 15,
    },
});