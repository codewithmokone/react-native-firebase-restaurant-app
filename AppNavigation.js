import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import OrderPreparingScreen from './screens/OrderPreparingScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import PaymentDetailsScreen from './screens/PaymentDetailsScreen';
import DishScreen from './screens/DishScreen';
import TabScreen from './TabScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome"  >
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="TabScreen" component={TabScreen} options={{ headerShown: false, title: 'Home' }} />
                <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Dish" component={DishScreen} options={{ headerShown: false, presentation: 'modal' }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Details', headerShown: true }} />
                <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Payment" component={PaymentScreen} options={{  }} />
                <Stack.Screen name="OrderPreparing" component={OrderPreparingScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation