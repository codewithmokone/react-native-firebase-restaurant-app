import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

function WelcomeScreen() {

    const navigation = useNavigation()

    const loginRoute = () => {
        navigation.navigate('Login')
    }

    const registerRoute = () => {
        navigation.navigate('Register')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{marginTop: 100, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: 165, height: 150}} source={require('../assets/categoryImages/salad.png')} />
               
               
                    <Text style={styles.headingText}>Fast Food Delivery</Text>
             
                
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
            </View>
        </SafeAreaView>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#52A63C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingText: {
        color: 'white',
        fontSize: 30,
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