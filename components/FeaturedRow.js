import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import RestaurantCard from './RestaurantCard';

export default function FeaturedRow({ title, description, restaurants }) {
  return (
    <View>
      <View style={styles.featuredItem}>
        <View>
          <Text>{title}</Text>
          <Text>{description}</Text>
        </View>
        <TouchableOpacity>
          <Text>See All</Text>
        </TouchableOpacity>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurentList: {
    overflow: 'hidden',
    paddingVertical: 5,
  }
});