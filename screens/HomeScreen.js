import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Categories from '../components/Categories';
import { burgerMenu } from '../constants';
import HomeHeader from '../components/HomeHeader';
import Carousel from '../components/Carousel';
import DishRow from '../components/DishRow';
import { Card } from 'react-native-paper';
import { Image } from 'react-native';
import { db } from '../config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

function HomeScreen() {

  const [favorite, setFavorite] = useState('');

  // Handles fetching data from firebase
  // const festchData = async () => {
  //   try {
  //     const favoriteCollection = (collection(db, "favorites"));
  //     const favSnapshot = await getDocs(
  //       query(favoriteCollection)
  //     )
  //     const data = [];
  //     favSnapshot.forEach((doc) => {
  //       const favList = doc.data();
  //       data.push({ id: doc.id, ...favList });
  //     });
  //     setFavorite(data);

  //   } catch (error) {
  //     console.error('Error fetching Firestore data:', error);
  //   }
  // }

  // useEffect(() => {
  //   festchData();
  // }, [])

  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <View style={{ width: '100%' }}>
        <HomeHeader />
      </View>
      <ScrollView showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        <Categories />
        <View style={{ marginTop: 20 }}>
          <Carousel />
        </View>
        <View style={{ marginTop: 15 }}>
        </View>
        <View style={{ paddingBottom: 144 }}>
          <Text style={{ marginLeft: 10, paddingHorizontal: 4, paddingVertical: 4, fontWeight: 400, fontSize: 18, lineHeight: 32, color: '#52A63C' }}>Favourite Meals</Text>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {[burgerMenu].map((item, index) => {
              return item.dishes.map((item, index) => <DishRow item={{ ...item }} key={index} />)
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
});