import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {useSelector} from 'react-redux'
import { selectCartItems, selectCartTotal } from '../redux/slices/cartSlice';

export default function CartIcon() {

    const navigation = useNavigation();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    
    if(!cartItems) return null;
    
    if(!cartTotal) return null;

    return (
        <View style={{ position: 'absolute', bottom: 5, width: "100%", zIndex: 50, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                style={styles.cartButton}
                onPress={() => navigation.navigate('Cart')}
            >
                <View style={{marginLeft: 30}}>
                    <Text style={{ color: 'white', fontWeight: 800, fontSize: 18}}>
                        {cartItems.length}
                    </Text>
                </View>
                <Text style={{ color: 'white', fontWeight: 800, fontSize: 18, fontSize: 18, lineHeight: 28}}>View Cart</Text>
                <Text style={{ color: 'white', fontWeight: 800, fontSize: 18, fontSize: 18, lineHeight: 28, marginRight: 30 }}>R{cartTotal}</Text>
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
        backgroundColor: '#52A63C',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 40,
        marginBottom: 10,
        borderRadius: '100%',
        paddingVertical: 3
    },
})