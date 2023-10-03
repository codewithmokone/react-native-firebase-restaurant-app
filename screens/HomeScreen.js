import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Icon from "react-native-feather";
import { auth } from '../config/firebase';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import { featured } from '../constants';
import { useEffect } from 'react';

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

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <SafeAreaView style={{alignItems: 'center'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%', marginLeft: 10}}>
        <View>
          {/* <Text>{userInfo.email}</Text> */}
        </View>
        <View style={styles.userInfo}>
          <Icon.LogOut height="20" width="20" strokeWidth={2.5} stroke="white" onPress={handleLogout} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.search}>
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder='Restaurents' style={styles.searchInput} />
          <View>
            <Icon.MapPin height="20" width="20" stroke="gray" />
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <Categories />
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
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    width: '97%',
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
    borderRadius: 40
  },
  searchInput: {
    flex: 1,
    width: 300,
    marginLeft: 90
  },
  userInfo: {
    margin: 5,
    padding: 3,
    backgroundColor: 'gray',
    borderRadius: 40
  }
});