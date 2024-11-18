import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // Import icons for the close button
import { apiClient } from "../services/ApiService";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [postId, setPostId] = useState(null);

  const handleChange = (name, value) => {
    setPostData({ ...postData, [name]: value });
  };

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

  const handleSubmit = async () => {
    try {
      if (!postData.title || !postData.description) {
        alert("Please enter title and description");
        return;
      }

      // Send title and description to backend and get postId
      const response = await apiClient.post('/post', postData);
      console.log("Post created:", response.data);
      setPostId(response.data.id);

      // Upload images
      const formData = new FormData();
      formData.append('id', response.data.id);
      const thumbnail = getThumbnail();
      if (thumbnail) {
        formData.append('thumbnail', {
          uri: thumbnail,
          type: 'image/jpeg',
          name: `${response.data.id}_thumbnail.jpg`,
        });
      }

      const regularImages = getRegularImages();
      regularImages.forEach((image, index) => {
        formData.append('images', {
          uri: image,
          type: 'image/jpeg',
          name: `${response.data.id}_image_${index + 1}.jpg`,
        });
      });

      await apiClient.put('/post/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setImages([]);
      setPostData({ title: "", description: "" });
      Alert.alert('Success!', 'Post created successfully.');
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert('Error!', 'Error creating post. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>Create Post</Text>
      <TextInput
        style={styles.input}
        value={postData.title}
        onChangeText={(text) => handleChange("title", text)}
        placeholder="Enter Post Title"
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        value={postData.description}
        onChangeText={(text) => handleChange("description", text)}
        placeholder="Enter Post Description"
        placeholderTextColor="#888"
        multiline={true}
        numberOfLines={4}
      />
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
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Align text to the top of the text area
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
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
  buttonView: {
    width: '100%',
    marginBottom: 20,
  },
});

export default CreatePost;