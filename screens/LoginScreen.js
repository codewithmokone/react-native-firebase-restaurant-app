import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

function LoginScreen() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigation = useNavigation()

    // const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, u => {
            dispatch(setUser(u));
        })
        return unsubscribe;
    }, [dispatch])

    // Handles user login
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigation.navigate('Home');
        } catch (err) {
            console.log('Error login in ', err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{width: '100%', alignItems: 'center'}}>
                <View style={styles.heading} >
                    <Text style={{ fontSize: 25, color: 'white' }}>Login to Account</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                    <Text>Haven't registered? </Text>
                    <Pressable
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: 'blue' }}>Sign Up</Text>
                    </Pressable>
                </View>
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        placeholder=" Enter your email"
                        onChangeText={text => setEmail(text)} />
                    <TextInput
                        style={styles.input}
                        placeholder=" Enter your password"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                    />
                        
                </View>
                <View style={{ marginTop: 15 }}>
                    <Pressable style={{ width: 310, height: 40, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={handleLogin}>
                        <Text style={{ color: 'green', fontSize: 20 }}>Login</Text>
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
        height: 45,
        marginBottom: 15,
    },
});