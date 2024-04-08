import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreateAd = () => {
    return (
        <View style={styles.container}>
            <Text>This is create ad</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default CreateAd;