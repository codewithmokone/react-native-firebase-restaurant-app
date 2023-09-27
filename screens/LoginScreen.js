import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { auth } from '../config/firebase';

function LoginScreen() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigation = useNavigation() 

    // Handles user login
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            alert('Logged in successfully')
            navigation.navigate('Home');
        }catch(err){
            console.log('Error login in ',err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading} >
                <Text>Login to Account</Text>
            </View>
            <View style={styles.inputSection}>
                <Text>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder=" Enter your email"
                    onChangeText={text => setEmail(text)} />
                <Text>password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder=" Enter your password"
                    onChangeText={text => setPassword(text)} />
            </View>
            <View>
                <Pressable onPress={handleLogin}>
                    <Text>Login</Text>
                </Pressable>
            </View>
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
        marginBottom: 15
    },
});