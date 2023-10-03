import { View, Text, TouchableOpacity, Image, ScrollView, Touchable } from 'react-native';
import React from 'react';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../redux/slices/restaurantSlice';
import { removeFromCart, selectCartItems, selectCartTotal } from '../redux/slices/cartSlice'
import { useState } from 'react';
import { useEffect } from 'react';

export default function CartScreen() {

  const restaurant = useSelector(selectRestaurant);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupedItems] = useState({});

  const dispatch = useDispatch()

  const deliveryFee = 2

  const navigation = useNavigation();

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {})
    setGroupedItems(items);
  }, [cartItems])

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ position: 'relative', paddingVertical: 4, }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', zIndex: 10, borderRadius: '100%', padding: 4, top: 20, left: 20 }}
        >
          <Icon.ArrowLeft strokeWidth={3} stroke='blue' />
        </TouchableOpacity>
        <View>
          <Text style={{ textAlign: 'center', fontWeight: 700, fontSize: 18, lineHeight: 28 }}>Your cart</Text>
          <Text style={{ textAlign: 'center', color: 'gray' }}>{restaurant.name}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: 'gray', flexDirection: 'row', paddingHorizontal: 4, alignItems: 'center' }}>
        <Image style={{ width: 80, height: 80, borderRadius: '100%' }} source={require('../assets/images/bikeGuy.png')} />
        <Text style={{ paddingLeft: 4, flex: 1, marginLeft: 20 }}>Delivered in 20-30 minutes</Text>
        <TouchableOpacity>
          <Text style={{ fontWeight: 700, marginRight: 12 }}>Change</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50
        }}
        style={{ backgroundColor: 'white', paddingTop: 5 }}
      >
        {
          Object.entries(groupedItems).map(([key, items]) => {
            let dish = items[0];
            return (
              <View
                key={key}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, backgroundColor: 'white' }}
              >
                <Text style={{ fontWeight: 700 }}>
                  {items.length} x
                </Text>
                <Image style={{ height: 56, width: 56, borderRadius: '100%', marginLeft: 10 }} source={dish.image} />
                <Text style={{ flex: 1, fontWeight: 700, color: 'gray', marginLeft: 10 }}>{dish.name}</Text>
                <Text style={{ fontWeight: 700, fontSize: 16, lineHeight: 24, marginRight: 12 }}>R{dish.price}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart({ id: dish.id }))}
                  style={{ borderRadius: '100%', padding: 4, backgroundColor: 'gray' }}
                >
                  <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
      <View style={{ padding: 6, paddingVertical: 32, paddingHorizontal: 32, borderTopRightRadius: 24, borderTopLeftRadius: 24, marginTop: 16, backgroundColor: 'blue' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <Text style={{ color: 'gray' }}>Subtotal</Text>
          <Text style={{ color: 'gray' }}>R{cartTotal}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'gray' }}>Delivery Fee</Text>
          <Text style={{ color: 'gray' }}>R{deliveryFee}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <Text style={{ color: 'gray', fontWeight: 800 }}>Order Total</Text>
          <Text style={{ color: 'gray', fontWeight: 800 }}>R{deliveryFee+cartTotal}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderPreparing')}
          style={{ backgroundColor: 'gray', padding: 12, borderRadius: '100%' }}>
          <Text style={{ color: 'white', fontWeight: 700, textAlign: 'center', fontSize: 18, lineHeight: 18 }}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}