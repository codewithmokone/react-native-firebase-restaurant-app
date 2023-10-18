import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Icon from "react-native-feather";
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabScreen() {
    return (
            <Tab.Navigator initialRouteName="Home" tabBarOptions={{ activeTintColor: '#52A63C' }}>
                <Stack.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ }) => (<View><Icon.Home strokeWidth={2} stroke='#52A63C' /></View>), headerShown: false, color: 'green' }} />
                <Stack.Screen name="Cart" component={CartScreen} options={{ tabBarIcon: ({ }) => (<View><Icon.ShoppingCart strokeWidth={2} stroke='#52A63C' /></View>), headerShown: false, presentation: 'modal' }} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', headerShown: true, tabBarIcon: ({ }) => (<View><Icon.User strokeWidth={2} stroke='#52A63C' /></View>), activeColor: 'blue', }} />
            </Tab.Navigator>
    )
}