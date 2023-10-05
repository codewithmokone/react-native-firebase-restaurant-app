import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Icon from "react-native-feather";
import { auth } from '../config/firebase';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import { featured, todays_specials } from '../constants';
import { useEffect } from 'react';
import HomeHeader from '../components/HomeHeader';
import TodaySpecials from '../components/TodaySpecials';

function HomeScreen() {

  // const [userInfo, setUserInfo] = useState('')

  // const userDetails = () => {
  //   const user = auth.currentUser

  //   if(user){
  //     setUserInfo(user)
  //   }
  // }

  // useEffect(() => {
  //   userDetails();
  // }, [])

 

  return (
    <SafeAreaView style={{alignItems: 'center'}}>
      <View style={{width: '100%'}}>
        <HomeHeader />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%', marginLeft: 5}}>
        <View>
          {/* <Text>{userInfo.email}</Text> */}
        </View>
      </View>
      {/* <View style={styles.searchContainer}>
        <View style={styles.search}>
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder='Restaurents' style={styles.searchInput} />
          <View>
            <Icon.MapPin height="20" width="20" stroke="gray" />
          </View>
        </View>
      </View> */}
      {/* <View style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#ACF598', width: '100%', height: 35}}>
        <Text style={{fontWeight: 700, marginHorizontal: 10}}>Categories</Text>
      </View> */}
      <ScrollView showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <Categories />
        <View style={{ marginTop: 5 }}>
          {[todays_specials].map((item, index) => {
            return (
              <TodaySpecials 
                key={index}
                title={item.title}
                dishes={item.dishes}
              />
            )
          })}
        </View>
        <View style={{ marginTop: 5 }}>
          {[featured, featured, featured, featured].map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            )
          })}
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