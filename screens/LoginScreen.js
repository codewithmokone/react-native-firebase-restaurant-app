import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

    const [errorMessage, setErrorMessage] = useState(false)

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

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
            if(err.code === 'auth/invalid-login-credentials'){
                setErrorMessage('Invalid login details.')
                // console.log('Invalid login details.');
            }
            
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
                <View>
                    {errorMessage && <Text style={styles.errortext}>{errorMessage}</Text>}
                </View>
                <View style={styles.inputSection}>
                    <View style={{ width: '99%' }}>
                        <TextInput
                            style={{ marginTop: 15, backgroundColor: 'white', borderRadius: 10, height: 50 }}
                            required
                            placeholder=' Email'
                            onChangeText={(text) => setEmail(text)}
                        />
                        {/* <TextInputComponent
                    label="Email"
                        // placeholder=' Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInputComponent
                        label="Password"
                        // placeholder=' Password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    /> */}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '99%' }}>
                        <TextInput
                            style={{ marginTop: 15, borderRadius: 10, backgroundColor: 'white', height: 50, width: '100%', marginLeft: -5 }}
                            placeholder=' Password'
                            required
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={!showPassword}
                        />
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#aaa"
                            style={styles.icon}
                            onPress={toggleShowPassword}
                        />
                    </View>
                </View>
                <View style={{ width: '90%', marginTop: 30 }}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{ width: '99%', height: 50, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ color: 'green', fontSize: 20 }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, width: '90%' }}>
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
        marginBottom: 10
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
    icon: {
        marginLeft: -30,
        marginTop: 20
    },
    errortext: {
        color:'red'
    }
});