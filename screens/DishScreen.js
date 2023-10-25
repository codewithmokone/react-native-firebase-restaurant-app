import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Checkbox } from 'react-native-paper';

export default function DishScreen() {

    const [selectedExtras, setSelectedExtras] = useState([]);
    const [checked, setChecked] = useState(false);

    const { params } = useRoute();
    const dispatch = useDispatch()
    const navigation = useNavigation()

    let { item, extras } = params;



    const extrasArray = Object.keys(extras).map((key) => ({
        name: extras[key].name,
        price: extras[key].price,
    }));


    const radio1 = {
        name: extrasArray[1].name,
        price: extrasArray[1].price,
    }

    const radio2 = {
        name: extrasArray[0].name,
        price: extrasArray[0].price,
    }

    console.log("Dish View: ", radio2.price)


    // const extrasArray = Array.isArray(extras) ? extras.map(extra => ({
    //     name: extra.name,
    //     price: extra.price,
    // })) : [];

    // console.log("Dish View: ", extras)

    // handles increasing the number of items
    const handleAddToCart = () => {
        dispatch(addToCart({ ...item }))
        navigation.navigate('Home')
    }

    const handleExtraSelection = (extra) => {
        const isSelected = selectedExtras.includes(extra);

        if (isSelected) {
            // If the extra is already selected, remove it from the list
            setSelectedExtras(selectedExtras.filter((item) => item !== extra));
        } else {
            // If it's not selected, add it to the list
            setSelectedExtras([...selectedExtras, extra]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: 250, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 90, }}>

            </View>
            <View style={styles.dishInfo}>
                <Image style={{ height: 200, width: 250, position: 'absolute', top: -100, resizeMode: 'contain' }} source={{ uri: item.image }} />
                <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 50 }}>
                    <Text style={{ fontSize: 24, lineHeight: 36, marginTop: 50 }}>{item.name}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 18, color: 'gray', marginHorizontal: 10, marginTop: 5 }}>{item.descr}</Text>
                </View>
                <View style={styles.extraItem}>
                    <Text>What would you like to add?</Text>
                    <View>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                            style={{ borderRadius: 10 }}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 36 }}>
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