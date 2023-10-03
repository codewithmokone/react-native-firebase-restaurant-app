import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsById } from '../redux/slices/cartSlice'

export default function DishRow({ item }) {

    const dispatch = useDispatch();

    const totalItems = useSelector(state => selectCartItemsById(state, item.id))

    if(!totalItems) return null;

    // handles increasing the number of items
    const handleIncrease = () => {
        dispatch(addToCart({...item}))
    }

    // handles decreasing the number of items
    const handleDecrease = () => {
        dispatch(removeFromCart({id: item.id}))
    }

    return (
        <View style={styles.container}>
            <Image style={{ height: 100, width: 100, borderRadius: 10 }} source={item.image} />
            <View style={{ flex: 1, marginTop: 12, }}>
                <View style={{ paddingLeft: 8 }}>
                    <Text style={{ fontSize: 18, lineHeight: 28 }}>{item.name}</Text>
                    <Text style={{ color: 'gray' }}>{item.description}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 8, alignItems: 'center' }}>
                    <Text style={{ color: 'gray', fontSize: 18, lineHeight: 28 }}>${item.price}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={handleDecrease}
                            disable={!totalItems.length}
                            style={{ padding: 1, borderRadius: '100%', backgroundColor: 'gray', width: 20 }}
                        >
                            <Icon.Minus strokeWidth={3} height={20} width={20} stroke={'white'} />
                        </TouchableOpacity>
                        <Text style={{ paddingHorizontal: 8 }}>
                            {totalItems.length}
                        </Text>
                        <TouchableOpacity
                            onPress={handleIncrease}
                            style={{ padding: 1, borderRadius: '100%', backgroundColor: 'gray', width: 20 }}
                        >
                            <Icon.Plus strokeWidth={3} height={20} width={20} stroke={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8,
        marginBottom: 3,
        marginHorizontal: 2,
    },
    restaurantImage: {
        height: 144,
        width: 256,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    restaurantDetails: {
        marginTop: 8,
        paddingHorizontal: 14,
        paddingBottom: 16,
    },
    text: {
        fontSize: 18,
        lineHeight: 28,
        paddingTop: 2,
        fontWeight: 700,
        marginTop: 10,
        marginLeft: 6
    },
    starIcon: {
        height: 14, width: 14
    }
});