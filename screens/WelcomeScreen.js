import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

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
            <ImageBackground source={require("../assets/images/welcome-screen.jpg")}
                style={{height: '100%', width: '100%', alignItems: 'center',
                juatifyContent: 'center' }} resizeMode='cover' >
                <View style={styles.heading}>
                    <Text style={styles.headingText}>WELCOME</Text>
                </View>
                <View style={styles.buttonSection}>
                    <Pressable style={styles.buttons} onPress={registerRoute}>
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                    <Pressable style={styles.buttons} onPress={loginRoute}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                </View>
                <StatusBar style="auto" />
            </ImageBackground>
        </SafeAreaView>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    headingText: {
        fontSize: 30,
        marginTop: 70,
    },
    buttonSection: {
        flex: 1,
        width: '100%',
        height: '50%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        width: '95%',
        height: '10%',
        margin: 10,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        flex: 1 ,
        flexDirection: 'row',
        color: 'white',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});