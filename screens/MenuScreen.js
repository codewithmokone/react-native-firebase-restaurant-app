import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image } from 'react-native'
import { SafeAreaView } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'
import { FlatList } from 'react-native'
import { Divider } from 'react-native-paper'
import * as Icon from "react-native-feather";

const MenuScreen = () => {

  const { params } = useRoute()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  let category = params

  console.log(category)

  const [menu, setMenu] = useState(category.menu)

  // handles increasing the number of items
  const handleIncrease = () => {
    dispatch(addToCart({ ...menu }))
  }

  // handles decreasing the number of items
  const handleDecrease = () => {
    dispatch(removeFromCart({ id: menu.id }))
  }

  const menuArray = Object.keys(menu).map((key) => ({
    descr: menu[key].descr,
    name: menu[key].name,
    price: menu[key].price,
    image: menu[key].imageUrl,
    smallImage: menu[key].imageSmall
  }));

  const extras = category.extras;

  return (
    <SafeAreaView>
      <View>
        <View style={{ flexDirection:'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1 }}>
          <Text style={{ marginVertical: 10, fontSize: 18 }} >{category.subTitle}</Text>
        </View>
        <View>
          <FlatList
            data={menuArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Dish', {
                  item: item,
                  extras: extras
                })}
              >
                <View style={{
                  height: 120,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderBottomWidth: 0.4
                }}
                >
                  <View style={{ width: 300 }}>
                    <Text style={{ fontSize: 15, fontWeight: 600, color: '#52A63C' }}>{item.name}</Text>
                    <Text style={{ marginVertical: 5, color: '#908E9B' }}>{item.descr}</Text>
                    <Text>From R{item.price}</Text>
                  </View>
                  <View style={{ width: 70, alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
                    <Image source={{ uri: item.smallImage }} style={{ width: 100, height: 90, resizeMode: 'contain', marginLeft: -20 }} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MenuScreen

const styles = StyleSheet.create({})