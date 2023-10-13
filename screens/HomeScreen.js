import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Categories from '../components/Categories';
import { featuredDishes,} from '../constants';
import HomeHeader from '../components/HomeHeader';
import Carousel from '../components/Carousel';
import DishRow from '../components/DishRow';

function HomeScreen() {

  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <View style={{ width: '100%' }}>
        <HomeHeader />
      </View>
      <ScrollView showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <Categories />
        <View style={{ marginTop: 20 }}>
          <Carousel />
        </View>
        <View style={{ marginTop: 15 }}>
          {/* {[featured].map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            )
          })} */}
        </View>
        <View style={{ paddingBottom: 144 }}>
          <Text style={{ marginLeft: 10, paddingHorizontal: 4, paddingVertical: 4, fontWeight: 400, fontSize: 18, lineHeight: 32, color: '#52A63C' }}>Menu</Text>
            <View style={{ flexDirection: 'column'}}>
              {[featuredDishes].map((item, index) => {
                return (
                  item.dishes.map((dish, index) => <DishRow item={{ ...dish }} key={index} />)
                )
              })}
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    width: '97%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 2
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 40,
    marginHorizontal: 1
  },
  searchInput: {
    flex: 1,
    width: 300,
    marginLeft: 90
  },
});