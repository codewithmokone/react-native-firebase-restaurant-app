import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStripe } from '@stripe/stripe-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../config/firebase';
import { collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import * as Icon from "react-native-feather";

const PaymentScreen = () => {

    const stripe = useStripe()
    const { params } = useRoute()
    const navigation = useNavigation()

    const { data } = useSelector(state => state.data)

    const items = params

    const [userId, setUserId] = useState(data.userId)
    const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [address, setAddress] = useState(data.address);
    const [contact, setContact] = useState(data.contact);
    const [isEditing, setIsEditing] = useState(false)

    let total = items.total

    console.log(items.cartItems)

    const handleEditName = () => {
        setIsEditName(true)
    }

    const handleEditAddress = () => {
        setIsEditEmail(true)
    }

    const handleSavePress = () => {
        setIsEditing(false)
    }

    const tokenizeCard = async () => {
        try {
            const cardDetails = {
                number: '4242424242424242', // Replace with the actual card number
                expMonth: 12, // Replace with the actual expiration month
                expYear: 25, // Replace with the actual expiration year
                cvc: '123', // Replace with the actual CVC
            };
            const cardToken = await stripe.createTokenWithCard(cardDetails);
            // The cardToken contains the tokenized card information
            console.log(cardToken);
        } catch (error) {
            console.error('Error tokenizing card:', error);
        }
    }

    const payment = async () => {

        try {
            // Sending request
            const response = await fetch("https://stripecardnodejs.onrender.com/pay", {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    amount: Math.floor(total * 100),
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await response.json();
            if (!response.ok) return Alert.alert(data.message);
            const clientSecret = data.clientSecret;
            const initSheet = await stripe.initPaymentSheet({
                paymentIntentClientSecret: clientSecret
            });
            if (initSheet.error) return Alert.alert(initSheet.error.message);
            const presentSheet = await stripe.presentPaymentSheet({
                clientSecret
            });
            if (presentSheet.error) return Alert.alert(presentSheet.error.message)
            Alert.alert('Payment complete, thank you!')
            navigation.navigate('OrderPreparing')

            const orderRef = doc(db, 'orders', userId);
            await setDoc(orderRef, {
                items: {
                    dish: items.cartItems,
                    total: total,
                    timestamp: serverTimestamp()
                }
            }, { merge: true })
            console.log('Order captured successfully')

        } catch (err) {
            console.log('Order not captured to database', err)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
            <View style={{}}>
                <View>
                    <Text style={{ fontSize: 18, marginVertical: 10, textAlign: 'left' }}>Card:</Text>
                    <Text>Selected card:</Text>
                </View>
                <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon.CreditCard strokeWidth={3} stroke={'#52A63C'} />
                    <Text style={{ marginLeft: 5 }}>{data.card.bankName}</Text>
                </View>
            </View>
            <View style={{ marginVertical: 10, height: 260 }}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, marginVertical: 15, fontWeight: 800 }}>Shipping Information</Text>
                    <View>
                        <Text>Email:</Text>
                        {
                            isEditing ?
                                (
                                    <View>
                                        <TextInput
                                            value={email}
                                            placeholder="Email"
                                            style={styles.shippingInput}
                                            onChangeText={text => setEmail(text)}
                                        />
                                    </View>
                                )
                                :
                                (
                                    <View>
                                        <Text style={styles.text}>{email}</Text>
                                    </View>
                                )
                        }

                    </View>
                </View>
                <Text style={{ marginVertical: 5, fontWeight: 800, }}>Shipping Address:</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {isEditing ? (
                        <View>
                            <TextInput
                                style={styles.shippingInput}
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
                            <TextInput
                                style={styles.shippingInput}
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                            />
                            <TextInput
                                style={styles.shippingInput}
                                value={contact}
                                onChangeText={(text) => setContact(text)}
                            />
                        </View>

                    ) : (
                        <View>
                            <Text style={styles.text}>{name}</Text>
                            <Text style={styles.text}>{address}</Text>
                            <Text style={styles.text}>{contact}</Text>
                        </View>
                    )}

                    {isEditing ? (
                        <TouchableOpacity onPress={handleSavePress} style={{ marginLeft: -12, position: 'absolute', right: -6, top: -122 }}>
                            <Text style={{ fontSize: 16, color: '#52A63C' }}>Save</Text>
                            {/* <Icon.Save strokeWidth={3} stroke={'#52A63C'} /> */}
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleEditName} style={{ marginLeft: -12, position: 'absolute', right: 10, top: -117 }}>
                            <Text style={{ fontSize: 16, color: '#52A63C' }}>Edit</Text>
                            {/* <Icon.Edit2 strokeWidth={3} stroke={'#52A63C'} /> */}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View>
                <TouchableOpacity
                    onPress={payment}
                    style={styles.paymentButton}
                >
                    <Text style={{ color: 'white' }}>Pay Order</Text>
                </TouchableOpacity>
            </View>
            {/* <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                    style={{ marginVertical: 20 }}
                >
                    <Text style={{ color: 'red' }}>Cancel Order</Text>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    shippingInput: {
        borderWidth: 1,
        // borderRadius: 20,
        borderColor: '#52A63C',
        width: 350,
        height: 30,
        marginVertical: 2,
        paddingHorizontal: 5,
    },
    paymentButton: {
        width: 350,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#52A63C',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 300
    },
    text: {
        marginVertical: 5,
    }
})