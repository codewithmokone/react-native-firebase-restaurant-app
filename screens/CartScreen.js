import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../redux/slices/restaurantSlice';
import { addToCart, removeFromCart, selectCartItems, selectCartTotal } from '../redux/slices/cartSlice'
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';

export default function CartScreen() {

  const { data } = useSelector(state => state.data); // Fetches user data from redux
  const restaurant = useSelector(selectRestaurant);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [address, setAddress] = useState(data.address);
  const [groupedItems, setGroupedItems] = useState({});

  const deliveryFee = 2 // Constant for delivery fee

  console.log(cartItems);

  const handleIncrease = (item) => {

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
    cartItems,
    total: cartTotal + deliveryFee
  }

  // Handles navigating to payment and params
  const navigateToPayment = async () => {
    if (data) {
      navigation.navigate('Payment', { ...items })
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
        <Text style={{ paddingLeft: 4, flex: 1, marginLeft: 5 }}>Delivering to {address}</Text>
        {/* <TouchableOpacity>
          <Text style={{ fontWeight: 700, marginRight: 12 }}>Change</Text>
        </TouchableOpacity> */}
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
            // let dish = items[1];
            return (
              <View
                key={key}
                style={{ height: 100, borderRadius: 10, marginVertical: 10 }}
              >
                {
                  items.map((item, index) => (
                    <Card
                      key={index}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        marginVertical: 10,
                        borderRadius: 10,
                        height: 270,
                        backgroundColor: 'white',
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          // height: 'auto',
                          width: 370,
                          marginHorizontal: 10,
                          borderRadius: 10
                        }}>

                        {/* <Image style={{ height: 60, width: 60, borderRadius: 100 }} source={{ uri: item.image }} /> */}
                        <View style={{ width: '95%', borderBottomWidth: 0.4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                          <Text style={{ fontWeight: 700, fontSize: 16, }}>{item.name}</Text>
                          <Text style={{ fontWeight: 700, fontSize: 16, lineHeight: 24, marginLeft: 8 }}>R{item.price}</Text>
                        </View>
                        <Card.Content style={{ borderBottomWidth: 0.4, height: 60, justifyContent: 'center', width: '95%' }}>
                          <Text variant="bodyMedium" style={{ color: 'gray', marginLeft: -15 }}>{item.descr}</Text>
                        </Card.Content>
                        <Card.Content style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', width: '100%', height: 70, marginVertical: 5 }}>
                          <Text style={{ marginVertical: 5 }}>Extras:</Text>
                          <View style={{ flexDirection: 'column', width: '100%', height: 50, borderBottomWidth:0.3 }}>
                            {
                              item.extras.map(item => (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                  <Text style={{ color: 'gray', marginLeft: 10 }}>{item.name}</Text>
                                  <Text style={{ color: 'gray', marginLeft: 10 }}>R{item.price}</Text>
                                </View>
                              ))
                            }
                          </View>
                        </Card.Content>
                        <Card.Content style={{ borderBottomWidth: 0.4, height: 60, justifyContent: 'center', width: '95%' }}>
                          <Text variant="bodyMedium" style={{ color: 'gray', marginLeft: -15 }}>R{cartTotal}</Text>
                        </Card.Content>
                        <Card.Actions style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: '#52A63C', width: '80%', height: 70 }}>
                          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:50, width:'100%', height:50}}>
                            <Button
                              onPress={() => dispatch(removeFromCart({ id: item.id }))}>
                              <Icon.Minus strokeWidth={5} height={20} width={20} stroke="#52A63C" />
                            </Button>
                            <Text style={{ fontWeight: 700 }}>x{item.length}</Text>
                            <Button
                              onPress={() => dispatch(addToCart({ ...item }))}>
                              <Icon.Plus strokeWidth={5} height={20} width={20} stroke="#52A63C" />
                            </Button>
                          </View>
                        </Card.Actions>
                      </View>
                    </Card>
                  ))
                }
              </View>
            )
          })
        }
      </ScrollView>
      <View style={{ paddingHorizontal: 32, borderTopRightRadius: 24, borderTopLeftRadius: 24, marginTop: 16, }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <Text >Subtotal</Text>
          <Text >R{cartTotal}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text >Delivery Fee</Text>
          <Text >R{deliveryFee}</Text>
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
    fontSize: 16,
    fontWeight: 800,
  },
  paymentButton: {
    backgroundColor: '#52A63C',
    padding: 12,
    borderRadius: 100,
    width: 350,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textPaymentButton: {
    color: 'white',
    fontWeight: 700,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 18,
  },
})