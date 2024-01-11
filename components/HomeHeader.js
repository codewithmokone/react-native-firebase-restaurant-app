import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';


export default function HomeHeader() {

    const navigation = useNavigation()

    const window = useWindowDimensions();

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{flexDirection: 'row' }}>
                    <Icon.MapPin height="20" width="20" stroke="gray" />
                    <Text style={{ fontWeight: '700', fontSize: 18, marginLeft: 5 }}>123 Lynnwood</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: window.width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})