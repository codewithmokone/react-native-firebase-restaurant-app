import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUser } from './redux/slices/userSlice';

const Stack = createNativeStackNavigator();
const auth = getAuth();

function AppNavigation() {

    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch();

    onAuthStateChanged(auth, u => {
        console.log('User Info: ',u)
        dispatch(setUser(u));
    })

    if (user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="WelcomeScreen">
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default AppNavigation