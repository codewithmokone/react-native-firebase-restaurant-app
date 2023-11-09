import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsById, selectCartItemsByIdMemoized } from '../redux/slices/cartSlice'
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from 'react-native-paper';
import { db } from '../config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export default function DishRow({ item }) {

    // console.log("Dish Row Log: ", item)

    const [specials, setSpecials] = useState([]);

    const dispatch = useDispatch();
    const navigation = useNavigation()
    const totalItems = useSelector(state => selectCartItemsByIdMemoized(state, item.id))

    if (!totalItems) return null;

    //Handles fetching data from firebase
    const festchData = async () => {
        try {
            const favoriteCollection = (collection(db, "specials"));
            const favSnapshot = await getDocs(favoriteCollection)

            // const favSnapshot = await getDocs(
            //     query(favoriteCollection)
            // )

            const data = [];
            favSnapshot.forEach((doc) => {
                const favList = doc.data();
                data.push({ id: doc.id, ...favList });
            });
            setSpecials(data);

        } catch (error) {
            console.error('Error fetching Firestore data:', error);
        }
    }

    console.log("Dish screen: ", specials.name)

    useEffect(() => {
        festchData();
    }, [])

    // handles increasing the number of items
    const handleIncrease = () => {
        dispatch(addToCart({ ...item }))
    }

    // handles decreasing the number of items
    const handleDecrease = () => {
        dispatch(removeFromCart({ id: item.id }))
    }

    // Rendering data from json file
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
                            <Text style={{ color: '#52A63C', fontSize: 18, lineHeight: 28, marginLeft: 18, marginTop: -7 }}>R{item.price}</Text>
                        </View>
                    </View>
                </Card>
            </TouchableWithoutFeedback>
        )
    }

    // Rendering data from firebase store
    if (specials) {
        {
            specials[0].map((item, index) => {
                <TouchableWithoutFeedback
                    key={index}
                    style={styles.container}
                    onPress={() => navigation.navigate('Dish', { item: item })}
                >
                    <Card style={{ width: 370, marginTop: 10, flexDirection: 'row', height: 100, backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', width: '90%' }}>
                            <Card.Cover source={item.imageUrl} style={{ width: 100, height: 100 }} />
                            <View style={{ flexDirection: 'column', width: '100%' }}>
                                <Card.Title
                                    title={item.name}
                                    subtitle={item.description}
                                    style={{ width: '70%' }}
                                />
                                <Text style={{ color: '#52A63C', fontSize: 18, lineHeight: 28, marginLeft: 18, marginTop: -7 }}>R{item.price}</Text>
                            </View>
                        </View>
                    </Card>
                </TouchableWithoutFeedback>
            })
        }
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