import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const handleResetPassword = async () => {

        if(!email){
            Alert.alert('Please provide a email address.')
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Password Reset Email Sent', 'Check your email for instructions to reset your password.');
        } catch (error) {
            console.error('Error sending reset email:', error);
            if (error.code === 'auth/user-not-found') {
                Alert.alert('User Not Found', 'This email is not associated with any account. Please check the email address.');
            } else {
                Alert.alert('Password Reset Failed', 'An error occurred while sending the reset email. Please try again.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                onChangeText={(text) => setEmail(text)}
                keyboardType='email-address'
            />
            <TouchableOpacity
                onPress={handleResetPassword}
                style={styles.resetButton}
            >
                <Text style={{ color: 'green', fontSize: 20 }}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: 'white', marginTop: 20 }}>Go Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#52A63C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        height: 50,
        width: '90%',
    },
    resetButton: {
        width: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 50,
        marginTop: 20,
    },
});

export default ForgotPassword
