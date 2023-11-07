import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ScrollViewBase, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { useRoute } from '@react-navigation/native';
import DishRow from '../components/DishRow';
import { useDispatch } from 'react-redux';
import CartIcon from '../components/CartIcon';
import { setRestaurant } from '../redux/slices/restaurantSlice';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';

export default function RestaurantScreen() {

    const { params } = useRoute();

    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation();

    let item = params;

    const dispatch = useDispatch();

    useEffect(() => {
        if (item && item.id) {
            dispatch(setRestaurant({ ...item }))
            setIsLoading(false)
        }
    }, [])

    return (
        <View>
            {
                isLoading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                ) : (
                    <View>
                        <CartIcon />
                        <ScrollView>
                            <View style={{ position: "relative" }}>
                                <Image style={{ width: 100, height: 288, marginBottom: -40 }} source={item.image} />
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ position: "absolute", top: 50, left: 16, backgroundColor: '#52A63C', padding: 4, borderRadius: '100%' }}
                                >
                                    <Icon.ArrowLeft strokeWidth={3} stroke={'white'} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: '#ACF598', marginTop: "-10", paddingTop: 6 }}>
                                <View style={{ paddingHorizontal: 5 }}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginTop: 6 }}>
                                        <Image source={require('../assets/images/fullStar.png')} style={styles.starIcon} />
                                        <Text style={{ fontSize: 14 }}>
                                            <Text style={{ color: 'green' }}>{item.stars}</Text>
                                            ({item.review} review) - <Text style={{ color: 'gray', }}>{item.category}</Text>
                                        </Text>
                                        <Icon.MapPin style={{ color: 'gray', width: 12, height: 12, marginLeft: 4 }} />
                                        <Text style={{ color: 'gray', fontSize: 12, lineHeight: 16 }}>Nearby - {item.address}</Text>
                                    </View>
                                    <Text style={{ color: 'gray', fontSize: 12, lineHeight: 16, marginTop: 6, marginLeft: 6 }}>{item.description}</Text>
                                </View>
                            </View>
                            <View style={{ paddingBottom: 144, backgroundColor: '#ACF598' }}>
                                <Text style={{ marginLeft: 10, paddingHorizontal: 4, paddingVertical: 4, fontWeight: 400, fontSize: 18, lineHeight: 32 }}>Menu</Text>
                                {
                                    item.dishes.map((dish, index) => <DishRow item={{ ...dish }} key={index} />)
                                }
                            </View>
                        </ScrollView>
                    </View>
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ACF598',
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 22,
        lineHeight: 28,
        paddingTop: 2,
        fontWeight: 800,
        marginTop: 10,
        marginLeft: 6
    },
    starIcon: {
        height: 14, width: 14
    }
});