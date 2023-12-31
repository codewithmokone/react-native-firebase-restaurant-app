import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

function WelcomeScreen() {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            // Navigate to home screen
            navigation.navigate('TabScreen');
        }, 5000)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop: -50}}>
                <Onboarding
                    showDone={false}
                    bottomBarHighlight={false}
                    showPagination={false}
                    pages={[
                        {
                            backgroundColor: 'white',
                            image:
                                <Image source={require('../assets/animation_lnvpbp6d_small.gif')} style={{ width: 180, height: 185 }} />,
                            title: 'Food Corner',
                            subtitle: 'Awesome Food Everyday',
                            titleStyles: { color: '#52A63C', marginTop: -70, fontSize: 30 }, // overwrite default color
                            subTitleStyles: { marginTop: -30 }
                        },
                    ]}
                />
            </View>
        </SafeAreaView>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});