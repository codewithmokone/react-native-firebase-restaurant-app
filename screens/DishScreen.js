import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

export default function DishScreen() {

    const { params } = useRoute();
    const dispatch = useDispatch()
    const navigation = useNavigation()

    let item = params;

    // handles increasing the number of items
    const handleAddToCart = () => {
        dispatch(addToCart({ ...item }))
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: 250, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 90, }}>

            </View>
            <View style={styles.dishInfo}>
                <Image style={{ height: 200, width: 250, position: 'absolute', top: -100 }} source={item.image} />
                <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 50}}>
                    <Text style={{ fontSize: 28, lineHeight: 36, marginTop: -150 }}>{item.name}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 20, color: 'gray', marginHorizontal: 10 }}>{item.description}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity
                            onPress={handleAddToCart}
                            style={styles.addToCartButton}
                        >
                            <Text style={{ color: 'white', marginLeft: 15 }}>Add To Cart</Text>
                            <Text style={{ color: 'white', fontSize: 20, marginRight: 15 }}>R{item.price}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#52A63C',
        borderRadius: 5
    },
    addToCartButton: {
        marginTop: 0,
        borderRadius: 100,
        flexDirection: 'row',
        backgroundColor: '#52A63C',
        width: 182,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dishInfo: {
        width: "100%",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
    }
});