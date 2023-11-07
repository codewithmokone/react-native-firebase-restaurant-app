import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { TextInput } from 'react-native-paper'

function RegisterScreen() {

    const navigation = useNavigation()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [password, setPassword] = useState("")
    const [bankName, setBankName] = useState("")
    const [cardNumber, setCardNUmber] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [cvv, setCvv] = useState("")

    // Handles navigating to the login page
    const handleNavigate = () => {
        navigation.navigate('Login');
    }

    // Handles signing up users to firebase auth
    const handleSignUp = async () => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                userId: user.uid,
                name: name,
                email: email,
                address: address,
                contact: contactNumber,
                card: {
                    bankName: bankName,
                    cardNmber: cardNumber,
                    expirationDate: expirationDate,
                    cvv: cvv,
                },
            });
            navigation.navigate('Home');
            alert('Account created successfully')
        } catch (err) {
            console.log('Accournt not created', err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ width: '100%', marginBottom: 70, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.heading} >
                    <Text style={styles.headingText}>Create New Account</Text>
                </View>
                <View style={styles.loginNavLink}>
                    <Text>Already registered? </Text>
                    <Pressable
                        onPress={handleNavigate}>
                        <Text style={{ color: 'blue' }}>Sign In</Text>
                    </Pressable>
                </View>
                <View style={styles.inputSection}>
                    <TextInput
                        style={{ marginTop: 2, width: "90%", marginVertical: 5 }}
                        label='Name'
                        mode='outlined'
                        required
                        activeOutlineColor='green'
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={{ marginTop: 2, width: "90%", marginVertical: 5 }}
                        label='Email'
                        mode='outlined'
                        required
                        activeOutlineColor='green'
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={{ marginTop: 2, width: "90%", marginVertical: 5 }}
                        label='Address'
                        mode='outlined'
                        required
                        activeOutlineColor='green'
                        onChangeText={text => setAddress(text)}
                    />
                    <TextInput
                        style={{ marginTop: 2, width: "90%", marginVertical: 5 }}
                        label='Contact'
                        mode='outlined'
                        required
                        activeOutlineColor='green'
                        onChangeText={text => setContact(text)}
                    />
                    <TextInput
                        style={{ marginTop: 2, width: "90%", marginVertical: 5 }}
                        label='Password'
                        mode='outlined'
                        required
                        activeOutlineColor='green'
                        onChangeText={text => setPassword(text)}
                    />
                    <TextInput
                        style={{ marginTop: 2, width: "90%", marginVertical: 5 }}
                        label='Bank Name'
                        mode='outlined'
                        required
                        activeOutlineColor='green'
                        onChangeText={text => setBankName(text)}
                    />
                    <TextInput
                        style={{ marginTop: 2, width: "90%", marginVertical: 5 }}
                        label='Card Number'
                        mode='outlined'
                        required
                        activeOutlineColor='green'
                        onChangeText={text => setCardNUmber(text)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                        <View style={{ width: '50%' }}>
                            <TextInput
                                style={{ marginTop: 2, width: "90%" }}
                                label='Expiry Date'
                                // mode='outlined'
                                required
                                activeOutlineColor='green'
                                onChangeText={text => setExpirationDate(text)}
                            />
                        </View>
                        <View style={{ width: '30%' }}>
                            <TextInput
                                style={{ marginTop: 2, width: "90%", marginLeft: 10 }}
                                label='CVV'
                                mode='outlined'
                                required
                                activeOutlineColor='green'
                                onChangeText={text => setCvv(text)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonSection}>
                    <Pressable style={{ width: 350, height: 40, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }} onPress={handleSignUp}>
                        <Text style={{ color: '#52A63C', fontSize: 20 }}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#52A63C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        marginTop: 60,
        marginBottom: 20
    },
    headingText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    loginNavLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    inputSection: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',

    },
    label: {
        alignItems: 'none',
        justifyContent: 'flex-start'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 15,
        width: '90%',
        height: 45
    },
    buttonSection: {
        flex: 1,
        marginTop: 40,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        width: 200,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        flex: 1,
        flexDirection: 'row',
        color: 'white',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});