import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function PaymentDetailsScreen() {

    const [card, setCard] = useState(true);

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View>
                <View style={{marginHorizontal: 20, marginVertical: 5}}>
                    <Text>Current Card Saved</Text>
                    {
                        card ? (
                            <View>
                                 <Text>Absa Card</Text>
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
                        <Text>Add Another Card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}