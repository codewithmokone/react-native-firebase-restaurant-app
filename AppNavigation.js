import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { setUser } from './redux/slices/userSlice';
import DishScreen from './screens/DishScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native-animatable';
import * as Icon from "react-native-feather";
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home1">
            <Stack.Screen name="Home1" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Details', headerShown: true }} />
            <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Dish" component={DishScreen} options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="OrderPreparing" component={OrderPreparingScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
            <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
        </Stack.Navigator>
    );
}

function AppNavigation() {

    // const user = auth.currentUser

    const dispatch = useDispatch();

    // const loggedInUser = () => {
    //     if (user) {
    //         dispatch(setUser(user));
           
    //     } else {
    //         console.log("No signed in user!")
    //     }

    //     console.log("Login screen",user)
        
    // }

    // useEffect(() => {
    
    //     loggedInUser()
        
    // }, [dispatch])

    const { user } = useSelector(state => state.user)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            dispatch(setUser(user));
        });

    }, []);


    if (user) {
        return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Home" >
                    <Stack.Screen name="Home" component={HomeStack} options={{ tabBarIcon: ({ }) => ( <View><Icon.Home strokeWidth={2} stroke='#52A63C'  /></View>), headerShown: false, color:'green' }} />
                    <Stack.Screen name="Cart" component={CartScreen} options={{tabBarIcon: ({ }) => (<View><Icon.ShoppingCart strokeWidth={2} stroke='#52A63C' /></View>),headerShown: false,presentation: 'modal'}} />
                    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', headerShown: true,  tabBarIcon: ({ }) => (<View><Icon.User strokeWidth={2} stroke='#52A63C' /></View>),  activeColor: 'blue', }} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="WelcomeScreen" >
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default AppNavigation