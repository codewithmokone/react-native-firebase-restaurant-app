import { View, Text, TouchableOpacity, Image, ScrollView, Touchable } from 'react-native';
import React from 'react';
import { featured } from '../constants';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux'
import { selectRestaurant } from '../redux/slices/restaurantSlice';

export default function CartScreen() {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{position: 'relative', paddingVertical: 4,}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', zIndex: 10, borderRadius: '100%', padding: 4, top: 20, left: 20}}
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
          <Text style={{fontWeight: 700, marginRight: 12}}>Change</Text>
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
                key={index}
                style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, backgroundColor: 'white'}}
              >
                <Text style={{fontWeight: 700}}>
                  2 x
                </Text>
                <Image style={{height: 56, width: 56, borderRadius: '100%', marginLeft: 10}} source={dish.image} />
                <Text style={{flex: 1, fontWeight: 700, color: 'gray', marginLeft: 10 }}>{dish.name}</Text>
                <Text style={{fontWeight: 700, fontSize: 16, lineHeight: 24, marginRight: 12}}>R{dish.price}</Text>
                <TouchableOpacity
                  style={{borderRadius: '100%', padding: 4, backgroundColor: 'gray'}}
                >
                  <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
      <View style={{padding: 6, paddingVertical: 32, paddingHorizontal: 32, borderTopRightRadius:24, borderTopLeftRadius:24, marginTop: 16, backgroundColor: 'blue'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',marginVertical: 10}}>
          <Text style={{color: 'gray'}}>Subtotal</Text>
          <Text style={{color: 'gray'}}>R20</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: 'gray'}}>Delivery Fee</Text>
          <Text style={{color: 'gray'}}>R2</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',  marginVertical: 10 }}>
          <Text style={{color: 'gray', fontWeight: 800}}>Order Total</Text>
          <Text style={{color: 'gray', fontWeight: 800}}>R30</Text>
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('OrderPreparing')}
          style={{backgroundColor: 'gray', padding: 12, borderRadius: '100%'}}>
          <Text style={{color: 'white', fontWeight: 700, textAlign: 'center', fontSize: 18, lineHeight: 18}}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}