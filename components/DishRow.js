import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsById } from '../redux/slices/cartSlice'
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DishRow({ item }) {

    const dispatch = useDispatch();

    const navigation = useNavigation()

    const totalItems = useSelector(state => selectCartItemsById(state, item.id))

    if (!totalItems) return null;

    // handles increasing the number of items
    const handleIncrease = () => {
        dispatch(addToCart({ ...item }))
    }

    // handles decreasing the number of items
    const handleDecrease = () => {
        dispatch(removeFromCart({ id: item.id }))
    }

    return (
        <TouchableWithoutFeedback
            style={styles.container}
            onPress={() => navigation.navigate('Dish', {...item})}
        >
            <View  style={styles.container}>
                <Image style={{ height: 80, width: 100, borderRadius: 10 }} source={item.image} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ paddingLeft: 8, justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ fontSize: 18, lineHeight: 28, textAlign: 'center' }}>{item.name}</Text>
                        <Text style={{ color: 'gray', marginVertical: 10 }}>{item.description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#52A63C', fontSize: 18, lineHeight: 28 }}>R{item.price}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 50 }}>
                            {/* <TouchableOpacity
                            onPress={handleDecrease}
                            disable={!totalItems.length}
                            style={{ padding: 1, borderRadius: '100%', backgroundColor: '#52A63C', width: 20, alignItems: 'center' }}
                        >
                            <Icon.Minus strokeWidth={3} height={20} width={20} stroke={'white'} />
                        </TouchableOpacity> */}
                            {/* <Text style={{ paddingHorizontal: 8 }}>
                            {totalItems.length}
                        </Text> */}
                            <TouchableOpacity
                                onPress={handleIncrease}
                                style={{ padding: 1, borderRadius: 100, backgroundColor: '#52A63C', width: 20, alignItems: 'center' }}
                            >
                                <Icon.Plus strokeWidth={3} height={20} width={20} stroke={'white'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 170,
        flexWrap: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8,
        marginBottom: 3,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5
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