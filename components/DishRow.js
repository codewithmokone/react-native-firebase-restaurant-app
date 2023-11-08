import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsById, selectCartItemsByIdMemoized } from '../redux/slices/cartSlice'
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from 'react-native-paper';

export default function DishRow({ item }) {

    // console.log("Dish Row Log: ", item)

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

    if (item) {
        return (
            <TouchableWithoutFeedback
                style={styles.container}
                onPress={() => navigation.navigate('Dish', { item: item })}
            >
                <Card style={{ width: 370, marginTop: 10, flexDirection: 'row', height: 100, backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', width: '90%' }}>
                        <Card.Cover source={item.image} style={{ width: 100, height: 100 }} />
                        <View style={{ flexDirection: 'column', width: '100%' }}>
                            <Card.Title
                                title={item.name}
                                subtitle={item.description}
                                style={{ width: '70%' }}
                            />
                            <Text style={{ color: '#52A63C', fontSize: 18, lineHeight: 28, marginLeft: 18, marginTop: -7}}>R{item.price}</Text>
                            {/* <Card.Actions style={{ width: '100%', marginLeft: -40, marginTop: -14, justifyContent: 'center', alignItems: 'center' }}>
                                <Button mode="text" onPress={handleDecrease}>
                                    <Icon.Minus strokeWidth={5} height={16} width={16} stroke={'#52A63C'} />
                                </Button>
                                <Text style={{ color: '#52A63C', fontSize: 18, lineHeight: 28, marginLeft: -28 }}>R{item.price}</Text>
                                <Button
                                    mode="text"
                                    onPress={handleIncrease}
                                    style={{ marginLeft: -20, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Icon.Plus strokeWidth={5} height={16} width={16} stroke={'#52A63C'} />
                                </Button>
                            </Card.Actions> */}
                        </View>
                    </View>
                </Card>
            </TouchableWithoutFeedback>
        )
    }
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