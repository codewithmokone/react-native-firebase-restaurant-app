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

    let total = 10


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

            // const orderRef = collection(db, 'orders').doc(userId); // Fix the path to the user's orders
            // items.forEach(async (order) => {
            //     try {
            //         const docRef = await orderRef.collection('orderItems').add(order); // Assuming you want to store orders in a subcollection 'orderItems'
            //         console.log(`Order added with ID: ${docRef.id}`);
            //     } catch (error) {
            //         console.error('Error adding order: ', error);
            //     }
            // })

            await setDoc(doc(db, 'orders', userId)), {
                name: name,
            }
            console.log('Order captured successfully')
            // await setDoc(orderRef, order, { merge: true });

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
            <View style={{ marginVertical: 10 }}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, marginVertical: 15 }}>Shipping Information</Text>
                    <View>
                        <Text>Email</Text>
                        <TextInput
                            value={email}
                            placeholder="Email"
                            style={styles.shippingInput}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                </View>
                <Text style={{ marginVertical: 5 }}>Shipping Address:</Text>
                <TextInput
                    style={styles.shippingInput}
                    value={name}
                    placeholder="Name"
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.shippingInput}
                    value={address}
                    placeholder="Address"
                    onChangeText={text => setAddress(text)}
                />
                <TextInput
                    style={styles.shippingInput}
                    value={contact}
                    placeholder="Contact"
                    onChangeText={text => setContact(text)}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress={payment}
                    style={styles.paymentButton}
                >
                    <Text style={{ color: 'white' }}>Pay Order</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                    style={{ marginVertical: 20 }}
                >
                    <Text style={{ color: 'red' }}>Cancel Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    shippingInput: {
        borderWidth: 2,
        // borderRadius: 20,
        borderColor: 'gray',
        width: 350,
        height: 50,
        marginVertical: 2,
        paddingHorizontal: 5
    },
    paymentButton: {
        width: 350,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#52A63C',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
})