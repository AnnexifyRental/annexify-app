import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import axios from 'axios';

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/post')
            .then(res => {
                console.log('inside: ', res.data);
                setPosts(res);
            })
            .catch(error => {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
              })
    });

    console.log('outside: ', posts);

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