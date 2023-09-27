import { signOut } from 'firebase/auth'
import React from 'react'
import { Pressable, SafeAreaView, Text } from 'react-native'
import { auth } from '../config/firebase'

function HomeScreen() {

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <SafeAreaView>
        <Text>Home Screen</Text>
        <Pressable onPress={handleLogout}>
          <Text>Logout</Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default HomeScreen