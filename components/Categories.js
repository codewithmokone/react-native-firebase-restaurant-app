import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { categories } from '../constants'
import { Touchable } from 'react-native';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from '../config/firebase'

export default function Categories() {

    const [activeCategory, setActiveCategory] = useState(null);

    const fetchData = async () => {

        const docRef = doc(db, "categories");
        const docSnap = await getDoc(docRef);
        // const querySnapshot = await getDocs(collection(db, "categories"));
        // querySnapshot.forEach((doc) => {
        // //     console.log('Firestore data', docSnap);
        // });
        console.log('Firestore data', docSnap);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15
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
                                    onPress={() => setActiveCategory(category.id)}
                                >
                                    <Image style={styles.categoryImage} source={category.image} />
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
    categoryImage: {
        width: 45,
        height: 45,
    },
    text: {
        fontSize: 12,
        lineHeight: 16,
    }
})