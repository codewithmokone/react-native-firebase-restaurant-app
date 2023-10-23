import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsById, selectCartItemsByIdMemoized } from '../redux/slices/cartSlice'
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DishRow({ item }) {

    const dispatch = useDispatch();

    const navigation = useNavigation()

    const totalItems = useSelector(state => selectCartItemsByIdMemoized(state, item.id))

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
            onPress={() => navigation.navigate('Dish', { ...item })}
        >
            <View style={styles.container}>
                <View>
                    <Image style={styles.dishImage} source={item.image} />
                </View>
                <View style={styles.dishDetailsContainer}>
                    <View style={{ width: '100%' }}>
                        <Text style={{ fontSize: 18, lineHeight: 28 }}>{item.name}</Text>
                        <Text style={{ color: 'gray', marginVertical: 10, }}>{item.description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 'auto', borderWidth: 1 , borderRadius: 100, borderColor: '#52A63C' }}>
                        <TouchableOpacity
                            onPress={handleDecrease}
                            style={{ padding: 1, borderRadius: 100, width: 29, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}
                        >
                            <Icon.Minus strokeWidth={5} height={16} width={16} stroke={'#52A63C'} />
                        </TouchableOpacity>
                        <Text style={{ color: '#52A63C', fontSize: 18, lineHeight: 28, }}>R{item.price}</Text>
                        <TouchableOpacity
                            onPress={handleIncrease}
                            style={{ padding: 1, borderRadius: 100, width: 27, alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}
                        >
                            <Icon.Plus strokeWidth={5} height={16} width={16} stroke={'#52A63C'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 370,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        shadowColor: '#52A63C',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    dishImage: {
        height: 80,
        width: 100,
        borderRadius: 10
    },
    dishDetailsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    }
});