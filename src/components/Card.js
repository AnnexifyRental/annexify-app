import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";

const Card = ({ post }) => {
    const { title, description, thumbnail } = post;
    const [imageData, setImageData] = useState(null);
    let imageUrl;

    fetch(`http://localhost:8082/file-uploader?fileName=/${thumbnail}`)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            const base64Flag = 'data:image/jpeg;base64,';
            const imageStr = arrayBufferToBase64(buffer);
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


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card}>
                {thumbnail && (
                    <Image style={styles.cardImage} source={{ uri: imageData }} />
                )}
                <Text style={styles.cardText}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
            </TouchableOpacity>
        </View>
    );
}


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

