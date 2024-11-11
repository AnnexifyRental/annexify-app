import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import BASE_URL from "../../Config";

const PostDetails = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/post/by/id?id=${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {post.thumbnail && (
        <Image source={{ uri: `${BASE_URL}/file-uploader?fileName=/${post.thumbnail}` }} style={styles.thumbnail} />
      )}
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>

      <Text style={styles.imageSectionTitle}>Additional Images</Text>
      {post.images && post.images.length > 0 ? (
        <FlatList
          data={post.images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: `${BASE_URL}/file-uploader?fileName=/${item}` }} style={styles.image} />
          )}
          horizontal
          contentContainerStyle={styles.imageList}
        />
      ) : (
        <Text style={styles.noImagesText}>No additional images available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "dodgerblue",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  imageSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "dodgerblue",
    marginBottom: 10,
  },
  imageList: {
    paddingVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  noImagesText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
});

export default PostDetails;
