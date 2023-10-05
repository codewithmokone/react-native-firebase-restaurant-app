import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import CartScreen from './screens/CartScreen';
import OrderPreparingScreen from './screens/OrderPreparingScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import PaymentDetailsScreen from './screens/PaymentDetailsScreen';
import AddCardScreen from './screens/AddCardScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {

    const { user } = useSelector(state => state.user)

    if (user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" >
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Account', headerShown: true }}/>
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{title: 'Details', headerShown: true }}/>
                    <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="AddCard" component={AddCardScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false, presentation: 'modal' }}/>
                    <Stack.Screen name="OrderPreparing" component={OrderPreparingScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }}/>
                    <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="WelcomeScreen" >
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default AppNavigation