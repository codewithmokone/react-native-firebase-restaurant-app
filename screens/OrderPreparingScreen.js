import { View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react';

export default function OrderPreparingScreen() {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            // Navigate to delivery screen
            navigation.navigate('Delivery');
        }, 3000)
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/images/delivery.gif')} style={{ height: 320, width: 320 }} />
        </View>
    )
}