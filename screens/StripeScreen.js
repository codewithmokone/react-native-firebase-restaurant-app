import { View, Text } from 'react-native';
import React from 'react';
import { StripeProvider } from "@stripe/stripe-react-native";
import Payment from '../components/Payment';

export default function StripeScreen() {
  return (
    <View>
      <Text>StripeScreen</Text>
      <StripeProvider publishableKey='pk_test_51NxnC4BeSY6ufzumLK8MdtlLxpI1qOUD4Ri0KqpNcCxsITV0PzXQpj3YsNaC0aLEeoBrOeIsfw6RgAYQTfDZSfZ000vGUVzUTN'>
        <Payment />
      </StripeProvider>
    </View>
  )
}