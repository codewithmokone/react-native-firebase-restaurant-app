import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { } from 'react-native-paper'

function RegisterScreen() {

    const navigation = useNavigation()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [password, setPassword] = useState("")
    const [bankName, setBankName] = useState("")
    const [cardNumber, setCardNUmber] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [loading, setLoading] = useState(false); // State variable to track loading visibility

    // Handles navigating to the login page
    const handleNavigate = () => {
        navigation.navigate('Login');
    }

    // Handles signing up users to firebase auth
    const handleSignUp = async () => {
        setLoading(true)

        try {

            if (!email || !password || !name || !email || !address || !contact) {
                Alert.alert('All fields are required.');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                userId: user.uid,
                name: name,
                email: email,
                address: address,
                contact: contact,
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
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView

                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
                style={styles.keyboardAvoidingContainer}
            >
            <View style={{ width: '100%', marginBottom: 40, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.heading} >
                    <Text style={styles.headingText}>Create New Account</Text>
                </View>
                <View style={styles.loginNavLink}>
                    <Text>Already registered? </Text>
                    <Pressable
                        onPress={handleNavigate}>
                        <Text style={{ color: 'white' }}>Sign In</Text>
                    </Pressable>
                </View>
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        required
                        placeholder=' Name and surname'
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        required
                        placeholder=' Email'
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        required
                        placeholder=' Address'
                        onChangeText={text => setAddress(text)}
                    />
                    <TextInput
                        style={styles.input}
                        required
                        placeholder=' Contact'
                        onChangeText={text => setContact(text)}
                    />
                    <TextInput
                        style={styles.input}
                        required
                        placeholder=' Password'
                        onChangeText={text => setPassword(text)}
                    />
                    {/* <TextInput
                        style={styles.input}
                        required
                        placeholder=' Bank name'
                        onChangeText={text => setBankName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        required
                        placeholder=' Card number'
                        onChangeText={text => setCardNUmber(text)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                        <View style={{ width: '50%' }}>
                            <TextInput
                                style={{ borderRadius:10, marginTop: 2, width: "90%", backgroundColor: '#F5F5F5', height: 50 }}
                                required
                                placeholder=' Expiry date'
                                onChangeText={text => setExpirationDate(text)}
                            />
                        </View>
                        <View style={{ width: '30%' }}>
                            <TextInput
                                style={{ borderRadius:10, marginTop: 2, width: "90%", marginLeft: 10, backgroundColor: '#F5F5F5', height: 50 }}
                                required
                                placeholder=' CVV'
                                onChangeText={text => setCvv(text)}
                            />
                        </View> */}
                    {/* </View> */}
                </View>

            </View>
            <View style={styles.buttonSection}>
                <TouchableOpacity style={{ width: 345, height: 50, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom: 5, }} onPress={handleSignUp}>
                    {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: 'green', fontSize: 20 }}>Register</Text>}
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>

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
        color: '#F5F5F5',
        fontWeight: 'bold',
        fontSize: 25,
    },
    loginNavLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        marinTop: -5
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
        marginTop: 2,
        width: 345,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        height: 50
    },
    buttonSection: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        width: '90%',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        flexDirection: 'row',
        color: 'white',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyboardAvoidingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});