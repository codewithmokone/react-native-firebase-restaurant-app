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
            <View style={{ width: '100%', height: 350, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 90,}}>
                <Image style={{ height: 200, width: 250 }} source={item.image} />
            </View>
            <View style={{ width: "100%", flex: 1, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 30,borderTopRightRadius: 30, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: -10}}>
                    <Text style={{ fontSize: 18, lineHeight: 36, marginRight: 120}}>{item.name}</Text>
                    <Text style={{ color: '#52A63C', fontSize: 28,marginLeft: 120}}>R{item.price}</Text>
                </View>
                <View>
                <Text style={{ color: 'gray', marginBottom: 250, marginHorizontal: 10 }}>{item.description}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity
                            onPress={handleAddToCart}
                            style={{ borderRadius: 100, backgroundColor: '#52A63C', width: 350, height: 60, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Text>Add To Cart</Text>
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
});