import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

export default function EditProfileScreen() {

    const navigation = useNavigation();

    const { user } = useSelector(state => state.user)

    console.log("User info: ", user.contact)

    return (
        <SafeAreaView>
            <View style={{}}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30 }}>Edit Profile</Text>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <TextInput
                        value={user.name}
                        style={styles.textInputFields}
                        placeholder=' Name'
                    />
                    <TextInput
                        value={user.email}
                        style={styles.textInputFields}
                        placeholder=' Email'
                    />
                    <TextInput
                        value={user.address}
                        style={styles.textInputFields}
                        placeholder=' Address'
                    />
                    <TextInput
                        value={user.contact}
                        style={styles.textInputFields}
                        placeholder=' Contact'
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