import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {useSelector} from 'react-redux'
import { selectCartItems } from '../redux/slices/cartSlice';

export default function CartIcon() {

    const navigation = useNavigation();

    const cartItems = useSelector(selectCartItems)
    if(!cartItems.length) return;

    return (
        <View style={{ position: 'absolute', bottom: 5, width: "100%", zIndex: 50, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                style={styles.cartButton}
                onPress={() => navigation.navigate('Cart')}
            >
                <View>
                    <Text style={{ color: 'white', fontWeight: 800, fontSize: 18, marginLeft: 20 }}>
                        3
                    </Text>
                </View>
                <Text style={{ flex: 1, color: 'white', fontWeight: 800, fontSize: 18, textAlign: "center", fontSize: 18, lineHeight: 28 }}>View Cart</Text>
                <Text style={{ flex: 1, color: 'white', fontWeight: 800, fontSize: 18, textAlign: "center", fontSize: 18, lineHeight: 28 }}>${23}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartButton: {
        width: "98%",
        height: 60,
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: '100%',
        padding: 2,
        paddingVertical: 3
    },
})