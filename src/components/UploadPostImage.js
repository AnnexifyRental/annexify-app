import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import axios from "axios";

const UploadPostImage = (props) => {

  const { postUuid } = props;
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 5,
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

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('uuid', postUuid);
    const thumbnail = getThumbnail();
    if (thumbnail) {
      formData.append('thumbnail', {
        uri: thumbnail.uri,
        type: thumbnail.type,
        name: `${postUuid}_thumbnail.jpg`,
      });
    }

    const regularImages = getRegularImages();
    regularImages.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        type: image.type,
        name: `${postUuid}_image_${index + 1}.jpg`,
      });
    });

    try {
      await axios.put("http://localhost:8082/post/images", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setImages([]);
      Alert.alert('Success!', 'Post created successfully.');
    } catch (error) {
      console.log('Error', error.response.data.message);
      Alert.alert('Error!', 'Error uploading post thumbnail. Retry uploading the image.');
    }
  }

  return (
    <View style={styles.container}>
      {/* Display thumbnail */}
      {getThumbnail() && (
        <Image
          source={{ uri: getThumbnail().uri }}
          style={styles.thumbnail}
        />
      )}

      {/* Display regular images */}
      <View style={styles.imageGrid}>
        {getRegularImages().map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </View>

      <TouchableOpacity style={styles.uploadBtnContainer} onPress={pickImage}>
        <Text style={styles.uploadTxt}>Add Images</Text>
      </TouchableOpacity>

      <View style={styles.buttonView}>
        <Button title="Upload" onPress={uploadImage} />
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',

  },
  buttonView: {
    width: '100%'
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default UploadPostImage;






