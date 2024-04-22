import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import axios from "axios";

const UploadPostImage = (props) => {

  const { postUuid } = props;

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('thumbnail', {
      uri: image,
      type: 'image/jpeg',
      name: postUuid + '_thumbnail.jpg'
    });
    formData.append('uuid', postUuid);
    try {
      await axios.put("http://192.168.1.7:8080/post/images", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.log('Error', error.response.data.message);

    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.uploadBtnContainer}
        onPress={pickImage}
      >
        {image
          ? <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
          : <Text style={styles.uploadTxt}>Choose picture</Text>}
      </TouchableOpacity>
      <Button title="Upload" style={styles.uploadBtn} onPress={uploadImage} />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // alignItems: 'center',

  },
  uploadBtn: {
    // width: '100%',
  },
  uploadBtnContainer: {
    height: 200,
    width: '90%',
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
