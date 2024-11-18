import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { Ionicons } from '@expo/vector-icons'; // Import icons for the close button
import { apiClient } from "../services/ApiService";

const UploadPostImage = (props) => {
  const { postId } = props;
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets.map((image) => image.uri));
    }
  };

  const getThumbnail = () => {
    return images.length > 0 ? images[0] : null;
  };

  const getRegularImages = () => {
    return images.slice(1);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const formData = new FormData();
    formData.append('id', postId);
    const thumbnail = getThumbnail();
    if (thumbnail) {
      formData.append('thumbnail', {
        uri: thumbnail,
        type: 'image/jpeg',
        name: `${postId}_thumbnail.jpg`,
      });
    }

    const regularImages = getRegularImages();
    regularImages.forEach((image, index) => {
      formData.append('images', {
        uri: image,
        type: 'image/jpeg',
        name: `${postId}_image_${index + 1}.jpg`,
      });
    });

    try {
      await apiClient.put('/post/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setImages([]);
      Alert.alert('Success!', 'Post created successfully.');
    } catch (error) {
      console.log('Error', error.response?.data?.message || error.message);
      Alert.alert('Error!', 'Error uploading post thumbnail. Retry uploading the image.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.hintText}>
        Your first image is chosen as the thumbnail of the post automatically.
      </Text>

      {/* Display thumbnail */}
      {getThumbnail() && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: getThumbnail() }} style={styles.image} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => removeImage(0)}
          >
            <Ionicons name="close-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* Display regular images */}
      <View style={styles.imageGrid}>
        {getRegularImages().map((image, index) => (
          <View key={index + 1} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => removeImage(index + 1)}
            >
              <Ionicons name="close-circle" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {images.length < 5 && (
        <TouchableOpacity style={styles.uploadBtnContainer} onPress={pickImage}>
          <Text style={styles.uploadTxt}>Add Images</Text>
          <Text style={styles.uploadLimitTxt}>Up to 5 images</Text>
        </TouchableOpacity>
      )}
      <View style={styles.buttonView}>
        <Button title="Save Pictures" onPress={uploadImages} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  buttonView: {
    width: '100%',
    marginBottom: 20,
  },
  hintText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
    textAlign: 'center',
  },
  uploadBtnContainer: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderStyle: 'dashed',
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  uploadTxt: {
    fontSize: 20,
    opacity: 0.5,
    fontWeight: 'bold',
  },
  imageGrid: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 4 / 3,
    borderRadius: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 2,
  },
});

export default UploadPostImage;
