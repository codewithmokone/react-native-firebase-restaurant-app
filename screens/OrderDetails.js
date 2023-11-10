import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { useSelector } from 'react-redux';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Card, List } from 'react-native-paper';
// import { List } from 'react-native-paper';

const OrderDetails = () => {

    const { user } = useSelector(state => state.user)

    const [date, setDate] = useState('')
    const [orderInfo, setOrderInfo] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const [total, setTotal] = useState('');
    const handlePress = () => setExpanded(!expanded);

    // Handels fetching data from firestore database
    const orderHistory = async () => {

        try {
            const orderRef = query(collection(db, 'orders'), where("userId", "==", user));
            const querySnapshot = await getDocs(orderRef);

            const ordersData = [];

            querySnapshot.forEach((doc) => {
                const orderData = doc.data()
                ordersData.push(orderData)
                setOrderInfo(ordersData)
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        orderHistory();
    }, [])

    return (
        <SafeAreaView>
            <ScrollView style={{ height: 'auto' }}>

                {/* <View style={{ height: 30, justifyContent: 'center', backgroundColor: 'whitesmoke' }}>
                        <Text style={{ marginHorizontal: 5, color: 'gray', fontWeight: '600' }}>ORDER SUMMARY</Text>
                    </View> */}
                <Card>
                    {orderInfo && orderInfo.length > 0 ? (
                        orderInfo.map((order, orderIndex) => (
                            <>
                                <View key={orderIndex} style={{ marginVertical: 10, marginTop: 10 }}>
                                    <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                                        <Text style={{ marginVertical: 7, marginHorizontal: 5, fontWeight: '600' }}>Date: {order.date}</Text>
                                        {order.dish.map((dish, dishIndex) => (
                                            <View key={dishIndex}>
                                                <Text style={{ marginVertical: 5, marginHorizontal: 5, fontWeight: '600' }}>{dish.name}</Text>
                                                <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>{dish.descr}</Text>
                                                <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>Price: R{dish.price}</Text>
                                                {dish.extras && dish.extras.length > 0 && (
                                                    <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>Extras: {dish.extras.map(extra => `${extra.name} (R${extra.price})`).join(', ')}</Text>
                                                )}
                                            </View>
                                        ))}
                                        <Text style={{ marginVertical: 5, marginHorizontal: 5, fontWeight: '800' }} > Order total: R{order.total}</Text>
                                    </View>
                                </View>
                            </>
                        ))
                    ) : (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>No order information available.</Text>
                        </View>
                    )}
                </Card>
            </ScrollView>
        </SafeAreaView >
    )
}

export default OrderDetails

const styles = StyleSheet.create({})