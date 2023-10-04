import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import RestaurantCard from './RestaurantCard';

export default function FeaturedRow({ title, description, restaurants }) {
  return (
    <View>
      <View style={styles.featuredItem}>
        <View style={{width: '100',marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View>
          <Text>{title}</Text>
          <Text>{description}</Text>
        </View>
        <TouchableOpacity>
          <Text>See All</Text>
        </TouchableOpacity>
      </View>
        </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        style={styles.restaurentList}
      >
        {
          restaurants.map((restaurant, index) => {
            return (
              <RestaurantCard
                key={index}
                item={restaurant}
              />
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  restaurentList: {
    overflow: 'hidden',
    paddingVertical: 5,
  }
});