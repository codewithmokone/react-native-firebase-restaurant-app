import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const TextInputComponent = () => {

    const [text, setText] = useState('')

    const onChangeText = (inputText) => {
        setText(inputText);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={text}
            />
        </View>
    )
}

export default TextInputComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: 350,
        marginTop: 15, 
        backgroundColor: 'white', 
        borderRadius: 10, 
        height: 50
    },
});