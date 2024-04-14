import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Card = ({ post }) => {
    const { title, thumbnail } = post;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card}>
                {thumbnail && (
                    <Image style={styles.cardImage} source={{ uri: thumbnail }} />
                )}
                <Text style={styles.cardText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
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
    }

});

export default Card;

