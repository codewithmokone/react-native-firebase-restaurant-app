import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Checkbox, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { FlatList } from 'react-native-web';

export default function DishScreen() {

    const { params } = useRoute();
    const dispatch = useDispatch()
    const navigation = useNavigation()

    let { item, extras } = params;

    const [selectedExtras, setSelectedExtras] = useState([]);

    // handles increasing the number of items
    const handleAddToCart = () => {
        const totalAmount = calculateTotalAmount();
        const combinedTotal = totalAmount;
        dispatch(addToCart({ ...item, extras: selectedExtras, totalAmount: combinedTotal }));
        navigation.navigate('Home');
    }

    // Function to calculate the total amount including extras
    const calculateTotalAmount = () => {
        let totalAmount = item.price;
        for (const extra of selectedExtras) {
            totalAmount += extra.price;
        }
        return totalAmount;
    };

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
            <View style={{ width: '100%', height: 250, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 90 }}>
                <Image style={{ height: 200, width: 250, resizeMode: 'contain' }} source={{ uri: item.image }} />
            </View>
            <View style={styles.dishInfo}>
                <View style={{ width: '100%', backgroundColor: 'white', height: 85, borderBottomWidth: 1.5, borderColor: '#52A63C' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text style={{ fontSize: 18, lineHeight: 36, textAlign: 'left', marginHorizontal: 10, fontWeight: 600, color: '#52A63C' }}>{item.name}</Text>
                        <Text style={{ fontSize: 16, lineHeight: 36, textAlign: 'left', marginHorizontal: 10, fontWeight: 500, marginRight: 25 }}>from R {item.price}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 14, color: 'gray', marginHorizontal: 10, marginTop: 1, marginBottom: 20, textAlign: 'left' }}>{item.descr}</Text>
                    </View>
                </View>
                <View style={{ width: '100%', marginHorizontal: 10, backgroundColor: 'white' }}>
                    <Text style={{ textAlign: 'left', marginHorizontal: 10, fontSize: 18, marginVertical: 15 }}>What would you like to add?</Text>
                    <Divider />
                </View>
                <View style={{ width: '100%', marginHorizontal: 10, backgroundColor: 'white' }}>
                    {
                        extras && extras.map((extra, index) => (
                            <View key={index}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginVertical: 5, marginLeft: -5 }}>
                                    <TouchableOpacity
                                        onPress={() => handleExtraSelection(extra)} c
                                        style={styles.checkbox}
                                    >
                                        <Text>{selectedExtras.includes(extra) ? <Icon name="check" size={20} color="black" /> : ''}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.extraInfo}>
                                        <Text style={styles.extraName}>{extra.name}</Text>
                                        <Text style={styles.extraPrice}>R {extra.price}</Text>
                                    </View>
                                </View>
                                <Divider />
                            </View>
                        ))
                    }
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 36 }}>
                    <TouchableOpacity
                        onPress={handleAddToCart}
                        style={styles.addToCartButton}
                    >
                        <Text style={{ color: 'white', marginLeft: 15, fontSize: 18 }}>Add To Cart</Text>
                        <Text style={{ color: 'white', marginRight: 15, fontSize: 20 }}> R{calculateTotalAmount()}</Text>
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
        // backgroundColor: '#52A63C',
        borderRadius: 5
    },
    addToCartButton: {
        marginTop: 0,
        borderRadius: 100,
        flexDirection: 'row',
        backgroundColor: '#52A63C',
        // width: '70%',
        width: 330,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    dishInfo: {
        width: "100%",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        backgroundColor: 'white',
    },
    extraInfo: {
        width: '80%',
        heigh: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    checkbox: {
        width: '7%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    extraName: {
        fontSize: 16,
        color: '#908E9B',
    },
    extraPrice: {
        fontSize: 16,
        color: '#908E9B'
    },
});