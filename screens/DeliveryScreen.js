import { View, Text, Image } from 'react-native';
import React from 'react';
import { featured } from '../constants';
import { useNavigation } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux'
import { selectRestaurant } from '../redux/slices/restaurantSlice';


export default function DeliveryScreen() {

    const resturant = useSelector(selectRestaurant);;

    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: resturant.lat,
                    longitude: resturant.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                mapType="standard"
            >
                <Marker
                    coordinate={{
                        latitude: resturant.lat,
                        longitude: resturant.lng,
                    }}
                    title={resturant.name}
                    description={resturant.description}
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
                            Your orer is on its way!
                        </Text>
                    </View>
                    <Image style={{height:96, width: 96}} source={require('../assets/images/bikeGuy2.gif')} />
                </View>
                <View style={{backgroundColor: 'gray',flexDirection: 'row', padding: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                    <Text style={{textAlign: 'center'}}>Enquiries call: 012-548-7458</Text>
                </View>
            </View>
        </View>
    )
}