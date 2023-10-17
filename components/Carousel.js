import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { Image } from 'react-native';

export default function Carousel() {

    const screenWidth = Dimensions.get("window").width;

    const carouselData = [
        {
            id: '01',
            image: require('../assets/carouselImages/image1.jpg')
        },
        {
            id: '02',
            image: require('../assets/carouselImages/image2.jpg')
        },
        {
            id: '03',
            image: require('../assets/carouselImages/image3.jpg')
        }
    ]

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Image style={{ height: 200, width: screenWidth }} source={item.image} />
            </View>
        )
    };

    return (
        <View>
            <FlatList data={carouselData} renderItem={renderItem} horizontal={true} pagingEnabled={true}/>
        </View>
    )
}