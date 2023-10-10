import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { useStripe } from '@stripe/stripe-react-native'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'

const Payment = () => {

    const [name, setName] = useState('')

    const stripe = useStripe()

    const payment = async () => {
        try{
            const response = await fetch('http://localhost"8080/pay', {
                method: 'POST',
                body: JSON.stringify({name}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            if(!response.ok) return alert(data.message);
            const clientSecret = data.clientSecret;
            const initSheet = await stripe.initPaymentSheet({
                paymentIntentClientSecret: clientSecret
            });
            if(initSheet.error) return alert(initSheet.error);
            const presentSheet = await stripe.presentPaymentSheet();
            if(presentSheet.error) return alert(presentSheet.error.message)
            alert('Payment complete, thank you!')
        }catch(error){
            console.error(error);
            alert('Something went wrong, try again later!')
        }
    }

    return (
        <View>
            <Text>Payment</Text>
            <TextInput 
                value={name} 
                onChange={text => setName(text)} 
                placeholder='Name'
            />
            <TouchableOpacity onPress={substribe}>
                <Text>Substribe</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Payment