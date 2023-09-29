import { signOut } from 'firebase/auth';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Icon from "react-native-feather";
import { auth } from '../config/firebase';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import { featured } from '../constants';

function HomeScreen() {

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <View style={styles.search}>
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder='Restaurents' style={styles.searchInput} />
          <View>
            <Icon.MapPin height="20" width="20" stroke="gray" />
          </View>
        </View>
        <View style={styles.userInfo}>
          <Icon.Sliders height="20" width="20" strokeWidth={2.5} stroke="white" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20
        }}
      >
        <Categories />
        <View style={{ marginTop: 5 }}>
          {[featured, featured, featured].map((item,index) => {
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