import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

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
            <SwiperFlatList 
                autoplay
                autoplayDelay={4}
                autoplayLoop
                data={carouselData} 
                renderItem={renderItem}
            />
        </View>
    )
}