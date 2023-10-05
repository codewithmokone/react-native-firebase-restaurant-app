import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'

export default function FeaturedRow({ title, dishes }) {

    return (
        <View>
            <View style={styles.featuredItem}>
                <View style={{ width: '100', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
                    <View>
                        <Text>{title}</Text>
                    </View>
                </View>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                style={styles.restaurentList}
            >
                {
                    dishes.map((dishes, index) => {
                        return (
                            <View key={index}>
                                <View style={{marginHorizontal: 10, backgroundColor: 'blue', height: 144,width: 365, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                     <Text>{dishes.name}</Text>
                                    <Image style={{ height: 136,width: 200}} source={dishes.image} />
                                   
                                </View>
                            </View>

                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ACF598',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    featuredItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ACF598',
    },
    restaurentList: {
        overflow: 'hidden',
        paddingVertical: 5,
    }
});