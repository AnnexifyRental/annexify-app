import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";

import axios from 'axios';
import Card from "../components/Card";

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setRefreshing(true);
            const response = await axios.get('http://localhost:8082/post');            
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                }
                data={posts}
                renderItem={({ item }) => <Card key={item.id} post={item} />}
                keyExtractor={(item) => item.id}
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