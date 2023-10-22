import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image } from 'react-native'
import { ViewComponent } from 'react-native'
import { SafeAreaView } from 'react-native'
import MenuCard from '../components/MenuCard'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import * as Icon from "react-native-feather";
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'

const MenuScreen = () => {

  const { params } = useRoute()

  let category = params

  const [menu, setMenu] = useState(category.menu)

  const navigation = useNavigation()
  const dispatch = useDispatch()

  // handles increasing the number of items
  const handleIncrease = () => {
    dispatch(addToCart({ ...menu }))
  }

  // handles decreasing the number of items
  const handleDecrease = () => {
    dispatch(removeFromCart({ id: menu.id }))
  }

  console.log("Dish Menu: ", category)

  const menuArray = Object.keys(menu).map((key) => ({
    descr: menu[key].descr,
    name: menu[key].name,
    price: menu[key].price,
    image: menu[key].imageUrl
  }));

  console.log("Dish Menu: ", menuArray)

  return (
    <SafeAreaView>
      <View>
        <View style={{ backgroundColor: 'green', height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 120, height: 120 }} source={{ uri: category.imageUrl }} />
        </View>
        <View>
          <FlatList
            data={menuArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Dish', { ...item })}
              >
                <View style={{
                  height: 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderBottomWidth:1
                }}
                >
                  <View style={{width: 300}}>
                    <Text style={{fontSize:15, fontWeight: 500}}>{item.name}</Text>
                    <Text  style={{marginVertical:5}}>Description: {item.descr}</Text>
                    <Text>Price: R{item.price}</Text>
                  </View>
                  <View style={{width: 70, alignItems: 'center' }}>
                    <Image source={{ uri: item.image }} style={{ width: 50, height: 90 }} />
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