import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../redux/slices/restaurantSlice';
import { addToCart, removeFromCart, selectCartItems, selectCartTotal } from '../redux/slices/cartSlice'
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';

export default function CartScreen() {

  const { data } = useSelector(state => state.data); // Fetches user data from redux

  const [address, setAddress] = useState('');
  const [groupedItems, setGroupedItems] = useState({});

  const restaurant = useSelector(selectRestaurant);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const deliveryFee = 2 // Constant for delivery fee

  const handleIncrease = () => {
    dispatch(addToCart({ ...item }))
  }

  // Prompts the user to login or sign up
  const userPrompt = () => {
    Alert.alert(
      'Sign Up or Login to continue',
      ' ',
      [
        {
          text: 'Register',
          onPress: () => navigation.navigate('Register'),
          style: 'cancel',
        },
        {
          text: 'Login',
          onPress: () => navigation.navigate('Login'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  }

  // Items passed to the params
  const items = {
    items: cartItems,
    total: cartTotal + deliveryFee
  }

  // Handles navigating to payment and params
  const navigateToPayment = async () => {

    if (data) {
      navigation.navigate('Payment', { items })
    } else {
      userPrompt()
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
        <Text style={{ paddingLeft: 4, flex: 1, marginLeft: 20 }}>Delivered to {address}</Text>
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
                style={{ flexDirection: 'row', alignItems: 'center', height: 150, paddingHorizontal: 16, backgroundColor: 'white', borderWidth: 1, marginHorizontal: 10, borderRadius: 10, marginVertical: 10 }}
              >
                <Text style={{ fontWeight: 700 }}>
                  {items.length} x
                </Text>
                <Image style={{ height: 56, width: 56, borderRadius: 100, marginLeft: 10 }} source={dish.image} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: 170 }}>
                  <Text style={{ fontWeight: 700, marginLeft: 10, marginVertical: 10 }}>{dish.name}</Text>
                  <Text style={{ fontWeight: 700, color: 'gray', marginLeft: 10 }}>{dish.description}</Text>
                </View>
                <View style={{borderWidth: 1, borderRaius:10, flexDirection:'row', alignItems: 'center', justifyContent:'center', borderColor:'#52A63C'}}>
                  <TouchableOpacity
                    onPress={() => dispatch(removeFromCart({ id: dish.id }))}
                  >
                    <Icon.Minus strokeWidth={5} height={20} width={20} stroke="#52A63C" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 700, fontSize: 16, lineHeight: 24, marginRight: 8, marginLeft: 8 }}>R{dish.price}</Text>
                  <TouchableOpacity
                    onPress={handleIncrease}
                  >
                    <Icon.Plus strokeWidth={5} height={20} width={20} stroke="#52A63C" />
                  </TouchableOpacity>
                </View>
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
          <Text style={styles.textTotal}>Order Total</Text>
          <Text style={styles.textTotal}>R{deliveryFee + cartTotal}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={navigateToPayment}
            style={styles.paymentButton}>
            <Text style={styles.textPaymentButton}>
              Check Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textTotal: {
    color: 'white',
    fontWeight: "900",
  },
  paymentButton: {
    backgroundColor: 'gray',
    padding: 12,
    borderRadius: 100,
    width: 350,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textPaymentButton: {
    color: 'white',
    fontWeight: "700",
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 18
  },
})