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
            console.log('inside fetchData:');
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            console.log('inside try: ', response.data);
            setPosts(response.data);
        } catch (error) {
            console.log('inside catch: ', error);
        }
    }

    console.log('outside: ', posts);

    return (
        <View style={styles.container}>
            {posts.length > 0 ? (
            posts.map((post) => (
                <Text key={post.id}>{post.title}</Text> // Display post titles
            ))
        ) : (
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