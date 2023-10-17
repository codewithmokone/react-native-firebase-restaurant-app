import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function PaymentDetailsScreen() {

    const { data } = useSelector(state => state.data)

    const [card, setCard] = useState(data);

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex:1}} >
            <View >
                <View style={{marginHorizontal: 20, marginVertical: 5, alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{fontSize: 20, marginVertical: 10}}>Current Card Saved</Text>
                    {
                        card ? (
                            <View>
                                 <Text>Card Number: {data.cardNmber}</Text>
                                 <Text>Expiry Data: {data.expirationDate}</Text>
                                 <Text>CVV: {data.cvv}</Text>
                            </View>
                        )
                        :
                        (
                            <View>
                                <Text>No card exist</Text>
                                <Text>Go to add card to create a new card </Text>
                            </View>
                        )
                    }
                </View>
                <View style={{marginHorizontal: 20, marginVertical: 5}}>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('AddCard')}
                    >
                        {/* <Text>Add Another Card</Text> */}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}