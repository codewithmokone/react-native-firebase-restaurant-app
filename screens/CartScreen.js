import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { featured } from '../constants';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const restaurant = featured.restaurants[0];
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{position: 'relative', paddingVertical: 4,}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', zIndex: 10, borderRadius: '100%', padding: 1, top: 20, left: 20}}
        >
          <Icon.ArrowLeft strokeWidth={3} stroke='blue' />
        </TouchableOpacity>
        <View>
          <Text style={{textAlign: 'center', 	fontWeight: 700, fontSize: 18, lineHeight: 28}}>Your cart</Text>
          <Text style={{textAlign: 'center', color: 'gray' }}>{restaurant.name}</Text>
        </View>
      </View>
      <View style={{backgroundColor: 'gray',flexDirection: 'row', paddingHorizontal: 4, alignItems:'center'}}>
        <Image style={{width: 80, height: 80, borderRadius: '100%'}} source={require('../assets/images/bikeGuy.png')} />
        <Text style={{paddingLeft: 4, flex:1, marginLeft: 20}}>Delivered in 20-30 minutes</Text>
        <TouchableOpacity>
          <Text style={{fontWeight: 700, marginRight: 10}}>Change</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50
        }}
        style={{backgroundColor: 'white', paddingTop: 5}}
      >
        {
          restaurant.dishes.map((dish, index) => {
            return (
              <View
                style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 2, paddingHorizontal: 2, backgroundColor: 'white', marginVertical: 4, marginBottom: 3, marginLeft: 20}}
              >
                <Text style={{fontWeight: 700}}>
                  2 x
                </Text>
                <Image style={{height: 56, width: 56, borderRadius: '100%', marginLeft: 10}} source={dish.image} />
                <Text>{dish.name}</Text>
                <Text>{dish.price}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}