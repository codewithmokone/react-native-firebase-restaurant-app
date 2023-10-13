import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../redux/slices/restaurantSlice';
import { addToCart, removeFromCart, selectCartItems, selectCartTotal } from '../redux/slices/cartSlice'
import { useStripe } from '@stripe/stripe-react-native';
import { SafeAreaView } from 'react-native';

export default function CartScreen() {

  const restaurant = useSelector(selectRestaurant);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const { userDetails } = useSelector(state => state.user);

  // const [address, setAddress] = useState(user.address)

  console.log("User Info: ", userDetails);

  const [groupedItems, setGroupedItems] = useState({});

  const dispatch = useDispatch()

  const deliveryFee = 2

  const navigation = useNavigation();

  let name = 'Simon'

  const stripe = useStripe()

  const handleIncrease = () => {
    dispatch(addToCart({ ...item }))
  }

  const payment = async () => {
    try {
      const response = await fetch('https://stripecardnodejs.onrender.com/pay', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json();
      if (!response.ok) return alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret
      });
      if (initSheet.error) return alert(initSheet.error);
      const presentSheet = await stripe.presentPaymentSheet();
      if (presentSheet.error) return alert(presentSheet.error.message)
      alert('Payment complete, thank you!')
      navigation.navigate('OrderPreparing')
    } catch (error) {
      console.error(error);
      alert('Something went wrong, try again later!')
    }
  }

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
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ position: 'relative', paddingVertical: 4, }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', zIndex: 10, borderRadius: 100, padding: 4, top: 20, left: 20 }}
        >
          <Icon.ArrowLeft strokeWidth={3} stroke='#52A63C' />
        </TouchableOpacity>
        <View>
          <Text style={{ textAlign: 'center', fontWeight: 700, fontSize: 18, lineHeight: 28 }}>Your cart</Text>
          <Text style={{ textAlign: 'center', color: 'gray' }}>Food Corner</Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#52A63C', flexDirection: 'row', paddingHorizontal: 4, alignItems: 'center' }}>
        <Image style={{ width: 80, height: 80, borderRadius: 100 }} source={require('../assets/images/bikeGuy.png')} />
        {/* <Text>{address}</Text> */}
        <Text style={{ paddingLeft: 4, flex: 1, marginLeft: 20 }}>Delivered in 20-30 minutes</Text>
        <TouchableOpacity>
          <Text style={{ fontWeight: 700, marginRight: 12 }}>Change</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40
        }}
        style={{ backgroundColor: 'white', paddingTop: 5 }}
      >
        {
          Object.entries(groupedItems).map(([key, items]) => {
            let dish = items[0];
            return (
              <View
                key={key}
                style={{ flexDirection: 'row', alignItems: 'center', height: 100 ,paddingHorizontal: 16, backgroundColor: 'white', borderWidth: 1, marginHorizontal: 10, borderRadius: 10 }}
              >
                <Text style={{ fontWeight: 700 }}>
                  {items.length} x
                </Text>
                <Image style={{ height: 56, width: 56, borderRadius: 100, marginLeft: 10 }} source={dish.image} />
                <View style={{flexDirection: 'column', justifyContent: 'center', width: 170}}>
                  <Text style={{ fontWeight: 700, color: 'gray', marginLeft: 10 }}>{dish.name}</Text>
                  <Text style={{ fontWeight: 700, color: 'gray', marginLeft: 10 }}>{dish.description}</Text>
                </View>
                <Text style={{ fontWeight: 700, fontSize: 16, lineHeight: 24, marginRight: 8, marginLeft: 8 }}>R{dish.price}</Text>

                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart({ id: dish.id }))}
                  style={{ borderRadius: 100, padding: 4, backgroundColor: '#52A63C' }}
                >
                  <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
      <View style={{ padding: 6, paddingVertical: 32, paddingHorizontal: 32, borderTopRightRadius: 24, borderTopLeftRadius: 24, marginTop: 16, backgroundColor: '#52A63C' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <Text style={{ color: 'white' }}>Subtotal</Text>
          <Text style={{ color: 'white' }}>R{cartTotal}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'white' }}>Delivery Fee</Text>
          <Text style={{ color: 'white' }}>R{deliveryFee}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <Text style={{ color: 'white', fontWeight: 800 }}>Order Total</Text>
          <Text style={{ color: 'white', fontWeight: 800 }}>R{deliveryFee + cartTotal}</Text>
        </View>
        <TouchableOpacity
          onPress={payment}
          style={{ backgroundColor: 'gray', padding: 12, borderRadius: 100 }}>
          <Text style={{ color: 'white', fontWeight: 700, textAlign: 'center', fontSize: 18, lineHeight: 18 }}>
            Check Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}