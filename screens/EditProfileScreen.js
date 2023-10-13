import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';

export default function EditProfileScreen() {

    const { userDetails } = useSelector(state => state.user)

    console.log("Edit Screen: ", userDetails)

    const [name, setName] = useState(userDetails.name)
    const [email, setEmail] = useState(userDetails.email)
    const [address, setAddress] = useState(userDetails.address)
    const [contact, setContact] = useState(userDetails.contact)
    const [cardNumber, setCardNumber] = useState(userDetails.cardNmber)
    const [expirationDate, setExpirationDate] = useState(userDetails.expirationDate)
    const [cvv, setCvv] = useState(userDetails.cvv)

    const navigation = useNavigation();


    const handleUpdate = async () => {

        let docId = userDetails.userId

        try{
            const userInfoUpdate = doc(db, "users", docId);
            await updateDoc(userInfoUpdate, {
                name: name,
                email: email,
                address: address,
                contact: contact,
                cardNmber: cardNumber,
                expirationDate: expirationDate,
                cvv: cvv,
            });
            console.log('User information updated');
        }catch(err){
            console.log(err)
        }
    }

    return (
        <SafeAreaView>
            <View style={{ marginTop: 30 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>Edit Profile</Text>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <TextInput
                        value={name}
                        style={styles.textInputFields}
                        placeholder=' Name and Surname'
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        value={email}
                        style={styles.textInputFields}
                        placeholder=' Email'
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        value={address}
                        style={styles.textInputFields}
                        placeholder=' Address'
                        onChangeText={(text) => setAddress(text)}
                    />
                    <TextInput
                        value={contact}
                        style={styles.textInputFields}
                        placeholder=' Contact'
                        onChangeText={(text) => setContact(text)}
                    />
                     <TextInput
                        value={cardNumber}
                        style={styles.textInputFields}
                        placeholder=' Contact'
                        onChangeText={(text) => setCardNumber(text)}
                    />
                     <TextInput
                        value={expirationDate}
                        style={styles.textInputFields}
                        placeholder=' Contact'
                        onChangeText={(text) => setExpirationDate(text)}
                    />
                      <TextInput
                        value={cvv}
                        style={styles.textInputFields}
                        placeholder=' Contact'
                        onChangeText={(text) => setCvv(text)}
                    />
                </View>
                <View style={{ flexDirection: 'colomn', justifyContent: 'center', alignItems: 'center', marginTop:150, marginHorizontal: 10, bottom: 0 }}>
                    <TouchableOpacity
                        style={{
                            width: 300,
                            height: 40,
                            margin: 10,
                            backgroundColor: '#52A63C',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10
                        }}
                        onPress={handleUpdate}
                    >
                        <Text style={{color:"white"}}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 300,
                            height: 40,
                            backgroundColor: '#52A63C',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10
                        }}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Text style={{color:"white"}}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInputFields: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10
    },
})