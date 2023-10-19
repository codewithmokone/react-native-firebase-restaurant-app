import { View, Text, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux'
import { selectRestaurant } from '../redux/slices/restaurantSlice';
import { emptyCart } from '../redux/slices/cartSlice';
import { TouchableOpacity } from 'react-native';
import * as Icon from "react-native-feather";


export default function DeliveryScreen() {

    const { data } = useSelector(state => state.data);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const lng = -85.5324269
    const lat = 38.2145602

    const cancelOrder = () => {
       navigation.navigate('Home');
       dispatch(emptyCart());
    }
    
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1, marginBottom: -50 }}
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                mapType="standard"
            >
                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lng,
                    }}
                    title="Food Corner"
                    // description={restaurant.description}
                />
            </MapView>
            <View style={{borderTopRightRadius: 24, borderTopLeftRadius: 24,marginTop:48, position:'relative', backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 20,paddingTop: 20, }}>
                    <View>
                        <Text style={{color: 'gray', fontWeight: 600, fontSize: 18, lineHeight: 18}}>
                            Estimated Arrival
                        </Text>
                        <Text style={{color: 'gray', fontWeight: 800, fontSize: 30, lineHeight: 36, marginTop: 6}}>
                            20-30 Minutes
                        </Text>
                        <Text style={{color: 'gray', fontWeight: 600, marginTop: 6}}>
                            Your order is on its way!
                        </Text>
                    </View>
                    <Image style={{height:96, width: 96}} source={require('../assets/images/bikeGuy2.gif')} />
                </View>
                <View style={{backgroundColor: '#52A63C',flexDirection: 'row', padding: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20, height: 50}}>
                    <Text style={{textAlign: 'center', color: 'white'}}>Enquiries call: 012-548-7458</Text>
                    <TouchableOpacity
                        onPress={cancelOrder}
                        style={{ marginLeft: 40, color: 'red' }}
                    >
                        <Text style={{ color: 'red' }}>Cancel Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}