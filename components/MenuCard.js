import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const MenuCard = () => {

    // const {menu} = useSelector(state => state.data)

    console.log("Menu Card: ", menu)

  return (
    <View>
      <Text>MenuCard</Text>
    </View>
  )
}

export default MenuCard

const styles = StyleSheet.create({})