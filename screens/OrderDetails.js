import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { useSelector } from 'react-redux';
import { collection, doc, getDoc } from 'firebase/firestore';

const OrderDetails = () => {

    const { user } = useSelector(state => state.user)

    const [date, setDate] = useState('')
    const [orderInfo, setOrderInfo] = useState('');
    const [total, setTotal] = useState('');

    const orderHistory = async () => {
        try {
            const orderCollection = collection(db, 'orders');
            const orderDocRef = doc(orderCollection, user);
            const orderDocSnapshot = await getDoc(orderDocRef);

            if (orderDocSnapshot.exists()) {
                const orderData = orderDocSnapshot.data();
                const date = orderData.items.timestamp
                const items = orderData.items.dish
                const total = orderData.items.total
                setDate(date)
                setOrderInfo(items)
                setTotal(total)
            } else {
                console.log('Failed to get user infromation');
            }
        } catch (err) {
            console.log(err)
        }
    }

    console.log("Orders info: ", date)

    useEffect(() => {
        orderHistory();
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
            <View style={{backgroundColor: 'white'}}>
            {orderInfo ? (
                orderInfo.map((item, index) => (
                    <>
                    <View key={index} style={{marginTop: 10, marginHorizontal: 5,}}>
                        <View style={{ height: 30, justifyContent:'center', backgroundColor: 'whitesmoke'}}>
                            <Text style={{marginHorizontal:5, color: 'gray', fontWeight:600}}>ORDER SUMMARY</Text>
                        </View>
                        <View>
                        <Text style={{marginVertical: 7, marginHorizontal: 5, fontWeight:600}}>{item.name}</Text>
                        </View>
                        <Text style={{marginVertical: 5, marginHorizontal: 5}}>{item.description}</Text>
                        <Text style={{marginVertical: 5, marginHorizontal: 5}}>R{item.price}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={{marginVertical: 5, marginHorizontal: 10, fontWeight:800}}>Order total:</Text>
                        <Text style={{marginVertical: 5, marginHorizontal: 10, fontWeight:800}}>R{total}</Text>
                    </View>
                    </>
                ))
            ) : (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                     <Text>No order information available.</Text>
                </View>
               
            )}
        </View>
            </ScrollView>
        </SafeAreaView>
       
    )
}

export default OrderDetails

const styles = StyleSheet.create({})