import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStripe } from '@stripe/stripe-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const PaymentScreen = () => {

    const stripe = useStripe()
    const { data } = useSelector(state => state.data)
    const navigation = useNavigation()

    const { params } = useRoute()

    const items = params

    const [userId, setUserId] =useState(data.userId)
    const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [address, setAddress] = useState(data.address);
    const [contact, setContact] = useState(data.contact);
    const [dishName, setDishName] = useState(items.items.name);
    const [dishIngredients, setDishIngredients] = useState(items.items.description);
    const [price, setPrice] = useState(items.items.price);

    let total = items.items.total

    console.log("Details: ", userId)

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

            console.log("Details: ", userId)

            try {
                const orderRef = doc(db, 'users', userId)
                await setDoc(orderRef, { capital: true }, { merge: true }), {
                    order: {
                        items: {
                            dishName: dishName,
                            dishIngredients: dishIngredients,
                            price: price
                        },
                        totalPrice: total,
                    },
                };
                console.log('Order captured successfully')
            } catch (err) {
                console.log('Order not captured to database', err)
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Something went wrong, try again later!')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'flex-start' }}>
                <View>
                    <Text style={{ fontSize: 18, marginVertical: 15, textAlign: 'left' }}>Card:</Text>
                </View>
                <View>
                    <Text>Saved card:</Text>
                    <Text>{data.card.cardNmber}</Text>
                </View>
            </View>
            <View style={{ marginVertical: 15 }}>
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
        borderRadius: 20,
        width: 350,
        height: 50,
        marginVertical: 5,
        paddingHorizontal: 10
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