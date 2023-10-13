import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from "firebase/firestore";
import {db} from '../config/firebase';

export default function Categories() {

    const [activeCategory, setActiveCategory] = useState(null);
    const [categoryData, setCategoryData] = useState([]);

    // Handle fetching data from the firestore
    const fetchFirestoreData = async () => {
        try {
            const categoryCollection = (collection(db, "categories"));
            const categorySnapshot = await getDocs(
                query(categoryCollection)
            )
            const data =[];
            categorySnapshot.forEach((doc) => {
                const categoryList = doc.data();
                data.push({id: doc.id, ...categoryList});
            });
            setCategoryData(data);
           
        } catch (error) {
            console.error('Error fetching Firestore data:', error);
        }
    };

    useEffect(() => {
        // Call the function to fetch data
        fetchFirestoreData();
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
                    categoryData.map((category, index) => {

                        let isActive = category.index == activeCategory;
                        let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200';
                        let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500';

                        return (
                            <View key={index} style={styles.categoryList}>
                                <TouchableOpacity
                                    style={styles.categoryItem}
                                    onPress={() => setActiveCategory(category.id)}
                                >
                                    <Image style={styles.categoryImage} source={{uri: category.imageUrl}} />
                                </TouchableOpacity>
                                <Text style={styles.text}>{category.title}</Text>
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
        padding: 2,
        borderRadius: '100%',
    },
    categoryImage: {
        width: 58,
        height: 55,
    },
    text: {
        fontSize: 12,
        lineHeight: 16,
    }
})