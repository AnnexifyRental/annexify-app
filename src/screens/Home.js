import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    return (

        <View style={styles.container}>
            <Text>This is home</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Home;