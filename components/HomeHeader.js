import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';


export default function HomeHeader() {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Icon.User stroke={'#52A63C'}/>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 80 }}>
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>Restaurents App</Text>
                </View>
                <View>

                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        width: '100%',
        alignItems: 'center',
    }
})