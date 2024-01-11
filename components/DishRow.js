import { View, Text, StyleSheet, useWindowDimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
// import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsByIdMemoized } from '../redux/slices/cartSlice'
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function DishRow({ item }) {

    const [specials, setSpecials] = useState([]);

    const dispatch = useDispatch();
    const navigation = useNavigation()
    const { height, width } = useWindowDimensions();
    // const totalItems = useSelector(state => selectCartItemsByIdMemoized(state, item.id))

    // if (!totalItems) return null;

    //Handles fetching data from firebase
    const festchData = async () => {
        try {
            const favoriteCollection = (collection(db, "specials"));
            const favSnapshot = await getDocs(favoriteCollection)

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

    // Rendering data from firebase store
    return (
        <View>
            {specials.map((special, index) => (
                <TouchableWithoutFeedback
                    key={index}
                    style={styles.container}
                    onPress={() => navigation.navigate('Dish', {
                        item: special,
                        extras: special.extras
                    })}
                >
                    <Card style={styles.card}>
                        <View style={{ flexDirection: 'row', width: '90%' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Card.Cover source={{ uri: special.smallImage }} style={{ width: 100, height: 60, resizeMode: 'cover', marginHorizontal: 10, backgroundColor: 'white', marginTop: 15, marginLeft: 10 }} />
                            </View>
                            <View style={{ flexDirection: 'column', width: '80%' }}>
                                <Card.Title
                                    title={special.name}
                                    style={{ width: '70%' }}
                                />
                                <Card.Content>
                                    <Text style={styles.description} variant="bodyMedium">{special.descr}</Text>
                                    <Text style={styles.price}>R{special.price}</Text>
                                </Card.Content>
                            </View>
                        </View>
                    </Card>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
    card: {
        width: '90%',
        marginTop: 10,
        flexDirection: 'row',
        height: 100,
        backgroundColor: 'white'
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
    },
    description: {
        color: 'gray',
        fontSize: 14,
        lineHeight: 16,
        // marginLeft: 18,
        marginTop: -8,
        marginVertical: 10
    },
    price: {
        color: '#52A63C',
        fontSize: 16,
        lineHeight: 28,
        // marginLeft: 18,
        marginTop: -7
    }
});