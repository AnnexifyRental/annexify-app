import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";

const UploadPostImage = () => {
    return (
        <View style={styles.container}>
        <Image
            source={{ uri: "https://picsum.photos/200/200" }}
            style={styles.image}
        />
        <Button title="Upload Image" onPress={() => alert("Image Uploaded!")} />
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
});

export default UploadPostImage;