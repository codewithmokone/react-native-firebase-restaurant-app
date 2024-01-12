import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { collection, doc, getDoc } from 'firebase/firestore';
import { setUserData } from '../redux/slices/userDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import TextInputComponent from '../components/TextInputComponent';

function LoginScreen() {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [email, setEmail] = useState('');  // State variable to hold email address
    const [password, setPassword] = useState(''); // State variable to hold password address
    const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility
    const [errorMessage, setErrorMessage] = useState(false) // State variable to track error message visibility
    const [loading, setLoading] = useState(false); // State variable to track loading visibility

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Function to log in to firebase auth
    const handleLogin = async () => {
        setLoading(true)

        // Input validation
        if (!email || !password) {
            Alert.alert('Please enter both email and password.');
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
        } catch (err) {
            if (err.code === 'auth/invalid-login-credentials') {
                setErrorMessage('Invalid login details.')
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingContainer}
            >
                <View style={styles.heading} >
                    <Title style={{ width: 345, fontSize: 28, color: 'white', textAlign: 'left' }}>
                        Login
                    </Title>
                    <Text style={{ color: 'white', marginTop: 10, fontSize: 16 }}>Please Sign in to continue.</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View>
                        {errorMessage && <Text style={styles.errortext}>{errorMessage}</Text>}
                    </View>
                    <View style={styles.inputSection}>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={{ width: 345, marginTop: 15, backgroundColor: 'white', borderRadius: 10, height: 50 }}
                                required
                                placeholder=' Email'
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                behavior={Platform.OS === 'ios' ? {marginLeft:-10} : null}
                                style={{ marginTop: 15, borderRadius: 10, backgroundColor: 'white', height: 50, width: 345 }}
                                placeholder=' Password'
                                required
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={!showPassword}
                            ></TextInput>
                        </View>
                        <MaterialCommunityIcons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color="#aaa"
                                style={styles.icon}
                                onPress={toggleShowPassword}
                            />
                    </View>
                    <View style={{ width: '90%', marginTop: 30 }}>
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={{ width: 345, height: 50, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}
                        >
                            {loading ? <ActivityIndicator color="green" /> : <Text style={{ color: 'green', fontSize: 20 }}>Login</Text>}
                        </TouchableOpacity>
                    </View>
                    {/* <View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '90%', alignItems: 'center' }}>
                            <Text>Haven't registered? </Text>
                            <Pressable
                                onPress={() => navigation.navigate('Register')}>
                                <Text style={{ color: 'white' }}>Sign Up</Text>
                            </Pressable>
                        </View>
                       
                    </View> */}
                    <View style={{ marginTop: 30, width: '90%', justifyContent: 'center' }}>
                            <Pressable onPress={() => navigation.navigate('resetPassword')}>
                                <Text style={{ color: 'white' }}>Forgot Password?</Text>
                            </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        marginBottom: 10,
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
        width: '95%',
        justifyContent:'center',
        alignItems:'center'
    },
    icon: {
        position:'absolute',
        right:10,
        bottom:10,
    },
    errortext: {
        color: 'red'
    },
    keyboardAvoidingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});