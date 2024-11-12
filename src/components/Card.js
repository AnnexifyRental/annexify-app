import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { apiClient } from "../services/ApiService";

const Card = ({ post }) => {
    const navigation = useNavigation();
    const { title, description, thumbnail } = post;
    const [imageData, setImageData] = useState(null);
    let imageUrl;

    if (thumbnail) {
        apiClient.get('/file-uploader', {
            params: {
                fileName: `/${thumbnail}`
            },
            responseType: 'arraybuffer'
        })
            .then(response => {
                const base64Flag = 'data:image/jpeg;base64,';
                const imageStr = arrayBufferToBase64(response.data);
                setImageData(base64Flag + imageStr);
            })
            .catch(error => {
                console.error("Error fetching and processing response:", error);
            });
        const arrayBufferToBase64 = (buffer) => {
            let binary = '';
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        };
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('PostDetails', { postId: post.id })}
            >
                {thumbnail && <Image style={styles.cardImage} source={{ uri: imageData }} />}
                <Text style={styles.cardText}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
    },
    card: {
        margin: 10,
        padding: 3,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    cardDescription: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 10,
    }
});

export default Card;

