import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import axios from 'axios';

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
            {posts.length > 0
                ? (posts.map((post) => (
                    <Text key={post.uuid}>{post.title}</Text>
                )))
                : (
                    <Text>Loading posts...</Text>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Home;