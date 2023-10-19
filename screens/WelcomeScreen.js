import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

function WelcomeScreen() {

    const navigation = useNavigation()

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

            <View style={{marginBottom: 70}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('TabScreen')}
                >
                    <Text style={{ color: '#52A63C', fontSize: 18}}>Click here to continue</Text>
                </TouchableOpacity>
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