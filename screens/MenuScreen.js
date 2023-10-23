import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image } from 'react-native'
import { SafeAreaView } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'
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
        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1 }}>
          <Image style={{ width: 120, height: 120, resizeMode: 'cover' }} source={{ uri: category.imageUrl }} />
        </View>
        <View style={{}}>
          <FlatList
            data={menuArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Dish', { ...item })}
              >
                <View style={{
                  height: 120,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderBottomWidth:1
                }}
                >
                  <View style={{width: 300}}>
                    <Text style={{fontSize:15, fontWeight: 600}}>{item.name}</Text>
                    <Text  style={{marginVertical:5, color: 'gray'}}>{item.descr}</Text>
                    <Text>Price: R{item.price}</Text>
                  </View>
                  <View style={{width: 70, alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
                    <Image source={{ uri: item.image }} style={{ width: 100, height: 90, resizeMode: 'contain' }} />
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