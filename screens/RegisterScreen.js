import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore'

function RegisterScreen() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [password, setPassword] = useState("")
    const [cardNumber, setCardNUmber] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [cvv, setCvv] = useState("")

    const navigation = useNavigation()

    // Handles navigating to the login page
    const handleNavigate = () => {
        navigation.navigate('Login');
    }

    // Handles signing up users to firebase auth
    const handleSignUp = async () => {

        // const user = auth.currentUser;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                name: name,
                email: email,
                address: address,
                contact: contactNumber,
                cardNmber: cardNumber,
                expirationDate: expirationDate,
                cvv: cvv,
            });

            alert('Account created successfully')
        } catch (err) {
            console.log('Accournt not created', err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }} source={require("../assets/images/RegisterScreen.jpg")}>
                <View style={{width: '90%', marginBottom: 70, justifyContent: 'center', alignItems: 'center'}}>
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
                        <Text>Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" Enter your name and surname"
                            onChangeText={text => setName(text)}
                            keyboardType="email-address"
                        />
                        <Text>Email:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" Enter your email"
                            onChangeText={text => setEmail(text)}
                        />
                        <Text>Address:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" Enter your address"
                            onChangeText={text => setAddress(text)}
                        />
                        <Text>Contact Number:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" Enter your contact number"
                            onChangeText={text => setContactNumber(text)}
                        />
                        <Text>Password:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" Enter your password"
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                        />
                        <Text>Card Number:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" Enter your card number"
                            onChangeText={text => setCardNUmber(text)}
                            secureTextEntry={true}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text>Expiration Date:</Text>
                                <TextInput
                                    style={{ backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5, marginBottom: 15, width: 160 }}
                                    placeholder=" Enter Expiry Date"
                                    onChangeText={text => setExpirationDate(text)}
                                    secureTextEntry={true}
                                />
                            </View>
                            <View>
                                <Text style={{ marginLeft: 5 }}>CVV:</Text>
                                <TextInput
                                    style={{ backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5, marginBottom: 15, width: 150, marginLeft: 5 }}
                                    placeholder=" Enter your CVV"
                                    onChangeText={text => setCvv(text)}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonSection}>
                        <Pressable style={{ width: 310, height: 40, borderRadius: 10, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }} onPress={handleSignUp}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Register</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        marginTop: 50,
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
        marginTop: 20,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 15,
        width: '100%'
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