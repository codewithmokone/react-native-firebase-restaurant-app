import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator, useWindowDimensions } from 'react-native';
import Categories from '../components/Categories';
import { burgerMenu } from '../constants';
import HomeHeader from '../components/HomeHeader';
import Carousel from '../components/Carousel';
import DishRow from '../components/DishRow';


function HomeScreen() {

  const [loading, setLoading] = useState(true);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#52A63C" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            paddingBottom: 10,
            width: width
          }}
        >
          <View>
            <HomeHeader />
          </View>
          <View style={{width:width}}>
            <Categories />
          </View>
          <View style={{ marginTop: 20}}>
            <Carousel />
          </View>
          <View style={{ marginTop: 15 }}>
          </View>
          <View style={{ paddingBottom: 144 }}>
            <Text style={{ marginLeft: 10, paddingHorizontal: 4, paddingVertical: 4, fontWeight: '400', fontSize: 18, lineHeight: 32, color: '#52A63C' }}>Specials</Text>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',width:width }}>
              <DishRow />
            </View>
          </View>
        </ScrollView>
      )}
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  dishrow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});