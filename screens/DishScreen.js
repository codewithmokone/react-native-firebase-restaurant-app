import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Checkbox, Divider } from 'react-native-paper';
import { FlatList } from 'react-native-web';

export default function DishScreen() {

    const { params } = useRoute();
    const dispatch = useDispatch()
    const navigation = useNavigation()

    let { item, extras } = params;

    console.log("From home screen",item)

    const [selectedExtras, setSelectedExtras] = useState([]);
    const [isChecked, setChecked] = useState(false);

    // handles increasing the number of items
    // const handleAddToCart = () => {
    //     dispatch(addToCart({ ...item }))
    //     navigation.navigate('Home')
    // }

    // handles increasing the number of items
    const handleAddToCart = () => {
        const totalAmount = calculateTotalAmount();
        const combinedTotal = item.price + totalAmount;
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

    console.log(calculateTotalAmount())

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
                <Image style={{ height: 200, width: 250, resizeMode: 'contain' }} source={{ uri: item.image }} />
            </View>
            <View style={styles.dishInfo}>
                <View style={{ width: '100%', backgroundColor: 'white', height:85, borderBottomWidth:3, borderColor: '#52A63C' }}>
                    <Text style={{ fontSize: 20, lineHeight: 36, textAlign: 'left', marginHorizontal: 10 }}>{item.name}</Text>
                    <Text style={{ fontSize: 16, color: 'gray', marginHorizontal: 10, marginTop: 1, textAlign: 'left' }}>{item.descr}</Text>
                </View>
                <View style={{width: '100%', marginHorizontal: 10, backgroundColor:'white' }}>
                    <Text style={{ textAlign: 'left', marginHorizontal: 10, fontSize: 18, marginVertical: 15 }}>What would you like to add?</Text>
                    <Divider />
                </View>
                <View style={{ width: '100%', marginHorizontal: 10,backgroundColor:'white',borderBottomWidth:3, borderColor: '#52A63C' }}>
                    {
                        
                        extras && extras.map((extra, index) => (
                            <>
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginVertical: 5 }}>
                                    <TouchableOpacity
                                        onPress={() => handleExtraSelection(extra)}c
                                        style={styles.checkbox}
                                    >
                                        <Text>{selectedExtras.includes(extra) ? 'X' : ''}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.extraInfo}>
                                        <Text style={styles.extraName}>{extra.name}</Text>
                                        <Text style={styles.extraPrice}>R {extra.price}</Text>
                                    </View>
                                </View>
                                <Divider />
                            </>
                        ))
                    }
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 36 }}>
                    <TouchableOpacity
                        onPress={handleAddToCart}
                        style={styles.addToCartButton}
                    >
                        <Text style={{ color: 'white', marginLeft: 15 }}>Add To Cart</Text>
                        <Text style={{ color: 'white', fontSize: 20, marginRight: 15 }}> R{calculateTotalAmount()}</Text>
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
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        backgroundColor: 'white',
    },
    extraInfo: {
        width: '80%',
        heigh:20,
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
        fontSize: 18,
        color: 'gray',
    },
    extraPrice: {
        fontSize: 18,
        color: 'gray'
    },
});