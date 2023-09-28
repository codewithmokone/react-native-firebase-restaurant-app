import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { categories } from '../constants'
import { Touchable } from 'react-native';

export default function Categories() {

    const [activeCategory, setActiveCategory] = useState(null);

  return (
    <View style={styles.container}>
        <ScrollView style={styles.scroll}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 15,
            }}
        >
            {
                categories.map((category, index) => {

                    let isActive = category.id == activeCategory;
                    let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200';
                    let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500';

                    return (
                        <View key={index} style={styles.categoryList}>
                            <TouchableOpacity  
                                style={styles.categoryItem}
                                onPress={()=> setActiveCategory(category.id)}
                            >
                                <Image style={{width: 45, height: 45}} 
                                    source={category.image} />
                            </TouchableOpacity>
                            <Text style={styles.text}>{category.name}</Text>
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
      marginTop: 4,
    },
    scroll: {
        overflow: 'visible',
    },
    categoryList: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    categoryItem: {
        padding: 1,
        backgroundColor: 'gray',
        borderRadius: '100%',
        fontSize: 10,
    },
    text: {
        fontSize: 12,
        lineHeight: 16,
    }
})