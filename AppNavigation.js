import React, { useEffect } from 'react';
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
import OrderDetails from './screens/OrderDetails';
import MenuScreen from './screens/MenuScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from './redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/slices/userDataSlice';

const Stack = createNativeStackNavigator();

function AppNavigation() {

    const dispatch = useDispatch()

    useEffect(() => {
        const asyncData = async () => {
             const value = await AsyncStorage.getItem('token');
             const fetchedData = JSON.parse(value)
             if(fetchedData !== null){
                dispatch(setUser(fetchedData.userId))
                dispatch(setUserData(fetchedData))
             }
         }
         asyncData()
     },[])

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome"  >
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="TabScreen" component={TabScreen} options={{ headerShown: false, title: 'Home' }} />
                <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Dish" component={DishScreen} options={{ headerShown: false, presentation: 'modal' }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true, title: 'Your Cart', headerTintColor: '#52A63C', }} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Details', headerShown: true,  headerTintColor: '#52A63C', }} />
                <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Payment" component={PaymentScreen} options={{  }} />
                <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ title: 'Order Summary',headerTintColor: '#52A63C', }} />
                <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ title: '',  headerTintColor: '#52A63C', }} />
                <Stack.Screen name="OrderPreparing" component={OrderPreparingScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
                <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation