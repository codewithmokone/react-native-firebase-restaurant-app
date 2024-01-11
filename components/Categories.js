import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../config/firebase';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setMenu } from '../redux/slices/menuSlice';

export default function Categories() {

    const [activeCategory, setActiveCategory] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategoryMenu, setSelectedCategoryMenu] = useState([]);

    const { width, height } = useWindowDimensions().width;

    const navigation = useNavigation();

    const dispatch = useDispatch();

    // Handle fetching data from the firestore
    const fetchCategoryData = async () => {
        try {
            const categoryCollection = (collection(db, "categories"));
            const categorySnapshot = await getDocs(
                query(categoryCollection)
            )
            const data = [];
            categorySnapshot.forEach((doc) => {
                const categoryList = doc.data();
                data.push({ id: doc.id, ...categoryList });
            });
            setCategoryData(data);

        } catch (error) {
            console.error('Error fetching Firestore data:', error);
        }
    };

    // console.log("Checking Menu", selectedCategoryMenu)

    useEffect(() => {
        // Call the function to fetch data
        fetchCategoryData();
    }, [])

    return (
        <TouchableWithoutFeedback
            style={styles.container}
        >
            <ScrollView style={styles.scroll}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    width: width,
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
                                    // style={styles.categoryItem}
                                    style={{ width: width }}
                                    onPress={() => {
                                        setActiveCategory(category.id)
                                        if (category.menu) {
                                            dispatch(setMenu(category.menu))
                                            navigation.navigate("MenuScreen", { ...category })
                                        } else {
                                            setSelectedCategoryMenu([]);
                                        }
                                    }}
                                >
                                    <Image style={styles.categoryImage} source={{ uri: category.iconUrl }} />
                                </TouchableOpacity>
                                <Text style={styles.text}>{category.title}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </TouchableWithoutFeedback>
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
        borderRadius: 100,
    },
    categoryImage: {
        width: 58,
        height: 55,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 12,
        lineHeight: 16,
    }
})