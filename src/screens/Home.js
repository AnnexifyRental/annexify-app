import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

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

    // return (
    //     <View style={styles.container}>
    //         {posts.length > 0
    //             ? (posts.map((post) => (
    //                 <Text key={post.uuid}>{post.title}</Text>
    //             )))
    //             : (
    //                 <Text>Loading posts...</Text>
    //             )}
    //     </View>
    // );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card}>
                <Image style={styles.cardImage} source={{ uri: 'https://mr2-demo-site.s3.ap-southeast-1.amazonaws.com/central-images/edc100123egan-002-6500742f5feb7.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240412T094949Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIA3N2PMWH6BU2347VQ%2F20240412%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=172800&X-Amz-Signature=11fe33ca85142ecbb1defe8d42325e1d76be36b3bd664537df2d6aa6cb7cb427'}} />
                <Text style={styles.cardText}>Post Title</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default Home;