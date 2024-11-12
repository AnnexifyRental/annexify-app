import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { apiClient } from '../services/ApiService';

const PostDetails = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbnailData, setThumbnailData] = useState(null);
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await apiClient.get(`/post/by/id`, {
          params: {
            id: postId
          }
        });
        setPost(response.data);
        if (response.data.thumbnail) {
          fetchThumbnail(response.data.thumbnail);
        }
        if (response.data.images) {
          fetchImages(response.data.images);
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchThumbnail = async (thumbnail) => {
      try {
        const response = await apiClient.get(`/file-uploader`, {
          params: {
            fileName: `/${thumbnail}`
          },
          responseType: 'arraybuffer'
        });
        const base64Flag = 'data:image/jpeg;base64,';
        const imageStr = arrayBufferToBase64(response.data);
        setThumbnailData(base64Flag + imageStr);
      } catch (error) {
        console.error('Error fetching thumbnail:', error);
      }
    };

    const fetchImages = async (images) => {
      try {
        const imagePromises = images.map(async (image) => {
          const response = await apiClient.get(`/file-uploader`, {
            params: {
              fileName: `/${image}`
            },
            responseType: 'arraybuffer'
          });
          const base64Flag = 'data:image/jpeg;base64,';
          const imageStr = arrayBufferToBase64(response.data);
          return { [image]: base64Flag + imageStr };
        });
        const imageDataArray = await Promise.all(imagePromises);
        const imageDataObject = imageDataArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setImageData(imageDataObject);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {post ? (
        <>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.description}</Text>
          {thumbnailData && (
            <Image source={{ uri: thumbnailData }} style={styles.thumbnail} />
          )}
          {post.images && post.images.map((item, index) => (
            <Image key={index} source={{ uri: imageData[item] }} style={styles.image} />
          ))}
        </>
      ) : (
        <Text style={styles.errorText}>Post not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default PostDetails;