import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useEffect, useState } from 'react';

function WelcomeScreen() {

    const [timer, setTimer] = useState(5);

    const navigation = useNavigation()

    useEffect(() => {
        const interval = setInterval(() => {
          if (timer > 1) {
            setTimer(timer - 1);
          } else {
            // Handle navigation to the main screen or any other action here
            navigation.navigate('TabScreen')
          }
        }, 1000);
    
        return () => clearInterval(interval);
      }, [timer]);

    const registerRoute = () => {
        navigation.navigate('Register')
    }

    return (
        <SafeAreaView style={styles.container}>
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
                        subTitleStyles: {marginTop: -30}
                    },
                ]}
            />
            {/* <View>
                <View style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/categoryImages/salad.png')} style={{ width: 165, height: 150 }} />


                    <Text style={styles.headingText}>Food Corner</Text>


                    <Text style={{marginVertical: 15}}>Please sign in or sign up to continue.</Text>

                    <Pressable style={styles.buttons} onPress={loginRoute}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center',}}>
                    <Text style={{ color: 'white' }}>Don't have an account?</Text>
                    <Pressable onPress={registerRoute}>
                        <Text style={{ color: 'blue', marginLeft: 5 }}>Sign Up</Text>
                    </Pressable>
                </View>
                <StatusBar style="auto" />
            </View> */}
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
    headingText: {
        color: 'white',
       
        marginTop: 10
    },
    buttonSection: {
        flex: 1,
        width: '100%',
        height: '50%',
        marginTop: -150,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        width: 250,
        height: '15%',
        margin: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        flexDirection: 'row',
        color: 'green',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});