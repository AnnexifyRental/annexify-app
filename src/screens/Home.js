import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";

import axios from 'axios';
import Card from "../components/Card";

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get('http://192.168.1.7:8080/post');
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
          <FlatList
            data={posts}
            renderItem={({ item }) => <Card key={item.uuid} post={item} />}
            keyExtractor={(item) => item.uuid}
            ListEmptyComponent={<Text>Loading...</Text>}
          />
        </View>
      );

};

const styles = StyleSheet.create({
    container: {
        flex: 1
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

export default Home;