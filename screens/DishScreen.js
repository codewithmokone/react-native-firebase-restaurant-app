import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Checkbox } from 'react-native-paper';
import { FlatList } from 'react-native-web';

export default function DishScreen() {

    const [selectedExtras, setSelectedExtras] = useState([]);
    const [isChecked, setChecked] = useState(false);


    const { params } = useRoute();
    const dispatch = useDispatch()
    const navigation = useNavigation()

    let { item, extras } = params;

    // handles increasing the number of items
    const handleAddToCart = () => {
        dispatch(addToCart({ ...item }))
        navigation.navigate('Home')
    }

    const handleExtraSelection = (extra) => {
        const isSelected = selectedExtras.includes(extra);

        if (isSelected) {
            setSelectedExtras(selectedExtras.filter((item) => item !== extra));
        } else {
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
                    <Text style={{ fontSize: 18, color: 'gray', marginHorizontal: 10, marginTop: 5, textAlign: 'left' }}>{item.descr}</Text>
                </View>
                <View style={{ marginVertical: 10, width: '100%', marginHorizontal: 10 }}>
                    <Text style={{ textAlign: 'left', marginHorizontal: 10, fontSize: 18 }}>What would you like to add?</Text>
                </View>
                <View style={{ width: '100%', marginHorizontal: 10 }}>
                    {
                        extras.map((extra, index) => (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginVertical: 10 }}>
                                <TouchableOpacity
                                    onPress={() => handleExtraSelection(extra)}
                                    style={styles.checkbox}
                                >
                                    <Text>{selectedExtras.includes(extra) ? 'X' : ''}</Text>
                                </TouchableOpacity>
                                <View style={styles.extraInfo}>
                                    <Text style={styles.extraName}>{extra.name}</Text>
                                    <Text style={styles.extraPrice}>{extra.price}</Text>
                                </View>
                            </View>
                        ))
                    }
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
    },
    extraInfo: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    checkbox: {
        width: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    extraName: {
        fontSize: 20,
    },
    extraPrice: {
        fontSize: 20,
    },
});