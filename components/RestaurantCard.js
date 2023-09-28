import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";

export default function RestaurentCard({ item }) {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Image style={styles.restaurantImage} source={item.image} />
        <View style={styles.restaurantDetails}>
          <Text style={styles.text}>{item.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 4}}>
            <Image source={require('../assets/images/fullStar.png')} style={{height: 14, width: 14}} />
            <Text style={{fontSize: 14}}>
              <Text style={{color: 'green'}}>{item.stars}</Text>
             ({item.review} review) - <Text style={{color: 'gray'}}>{item.category}</Text>
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems:'center', marginLeft: 1}}>
            <Icon.MapPin style={{color: 'gray', width: 12, height: 12}} />
            <Text style={{color: 'gray', fontSize: 12, lineHeight: 16}}>Nearby - {item.address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 18,
    backgroundColor: 'white',
    borderRadius: 24,
    shadowOpacity: 3,
    shadowColor: 'black',
    shadowRadius: [0, 0, 50, 0],
  },
  restaurantImage: {
    height: 144,
    width: 256,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  restaurantDetails: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingBottom: 16,
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
    paddingTop: 2,
    fontWeight: 700,
  },

})