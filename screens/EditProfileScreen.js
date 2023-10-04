import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

export default function EditProfileScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontSize: 30}}>Edit Profile</Text>
                </View>
                <View style={{marginHorizontal: 10}}>
                    <TextInput 
                        style={styles.textInputFields} 
                        placeholder=' Name'
                    />
                      <TextInput
                      style={styles.textInputFields} 
                        placeholder=' Email'
                    />
                      <TextInput 
                      style={styles.textInputFields} 
                        placeholder=' Address'
                    />
                      <TextInput 
                      style={styles.textInputFields} 
                        placeholder=' Contact'
                    />
                      <TextInput 
                      style={styles.textInputFields} 
                        placeholder=' Card Number'
                    />
                      <TextInput 
                      style={styles.textInputFields} 
                        placeholder=' Expiration Date'
                    />
                      <TextInput 
                      style={styles.textInputFields} 
                        placeholder=' CVV'
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    textInputFields: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10
    },
})